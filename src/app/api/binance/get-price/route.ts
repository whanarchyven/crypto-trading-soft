import axios from 'axios';
import { NextRequest } from 'next/server';

// Определяем тип для данных ответа от API
interface BinanceResponse {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

export interface GetPriceResponseInterface {
  symbol: string;
  bidPrice: string;
  bidSize: string;
  askPrice: string;
  askSize: string;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const coinSTRING = searchParams.get('coin');
    const coins = coinSTRING?.split('|') ?? ['BTCUSDT'];
    const spot = await axios.get<BinanceResponse[]>(
      'https://data.binance.com/api/v3/ticker/bookTicker'
    );
    const futures = await axios.get<BinanceResponse[]>(
      'https://fapi.binance.com/fapi/v1/ticker/bookTicker'
    );

    const filteredSpotData = spot.data.filter((price) =>
      coins.includes(price.symbol)
    );
    const filteredFuturesData = futures.data.filter((price) =>
      coins.includes(price.symbol)
    );

    const spotData: GetPriceResponseInterface[] = [];

    filteredSpotData.map((item) => {
      spotData.push({
        symbol: item.symbol,
        bidPrice: item.bidPrice,
        bidSize: item.bidQty,
        askPrice: item.askPrice,
        askSize: item.askQty,
      });
    });

    const futuresData: GetPriceResponseInterface[] = [];

    filteredFuturesData.map((item) => {
      futuresData.push({
        symbol: item.symbol,
        bidPrice: item.bidPrice,
        bidSize: item.bidQty,
        askPrice: item.askPrice,
        askSize: item.askQty,
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
