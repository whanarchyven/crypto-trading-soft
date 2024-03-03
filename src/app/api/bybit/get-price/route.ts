import axios from 'axios';
import { NextRequest } from 'next/server';
import { GetPriceResponseInterface } from '@/app/api/binance/get-price/route';

// Определяем тип для данных ответа от API
interface ApiResponse {
  retCode: number;
  retMsg: string;
  result: Result;
  retExtInfo: Record<string, unknown>; // или конкретный тип, если известен
  time: number;
}

interface Result {
  category: string;
  list: Instrument[];
}

interface Instrument {
  symbol: string;
  lastPrice: string;
  indexPrice: string;
  markPrice: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  openInterest: string;
  openInterestValue: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  nextFundingTime: string;
  predictedDeliveryPrice: string;
  basisRate: string;
  deliveryFeeRate: string;
  deliveryTime: string;
  ask1Size: string;
  bid1Price: string;
  ask1Price: string;
  bid1Size: string;
  basis: string;
}
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const coinSTRING = searchParams.get('coin');
    const coins = coinSTRING?.split('|') ?? ['BTCUSDT'];
    const spot = await axios.get<ApiResponse>(
      'https://api.bybit.com/v5/market/tickers?category=spot'
    );
    const futures = await axios.get<ApiResponse>(
      'https://api.bybit.com/v5/market/tickers?category=inverse'
    );

    const filteredSpotData = spot.data.result.list.filter((price) =>
      coins.includes(price.symbol)
    );
    const filteredFuturesData = futures.data.result.list.filter((price) =>
      coins.includes(price.symbol)
    );

    const spotData: GetPriceResponseInterface[] = [];

    filteredSpotData.map((item) => {
      spotData.push({
        symbol: item.symbol,
        bidPrice: item.bid1Price,
        bidSize: item.bid1Size,
        askPrice: item.ask1Price,
        askSize: item.ask1Size,
      });
    });

    const futuresData: GetPriceResponseInterface[] = [];

    filteredFuturesData.map((item) => {
      futuresData.push({
        symbol: item.symbol,
        bidPrice: item.bid1Price,
        bidSize: item.bid1Size,
        askPrice: item.ask1Price,
        askSize: item.ask1Size,
      });
    });

    const result = {
      spot: spotData,
      futures: futuresData,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    // Предполагаем, что ошибка имеет тип any, поскольку AxiosError может иметь различные формы
    if (axios.isAxiosError(error)) {
      // Обрабатываем ошибку Axios специфическим образом, если нужно
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    } else {
      // Общий случай для других типов ошибок
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  }
}
