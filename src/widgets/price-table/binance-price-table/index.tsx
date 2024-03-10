'use client';
import React, { useEffect, useState } from 'react';
import { fetchBinancePrice } from '@/shared/api/exchagers-data-fetching/fetchBinancePrice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import { tradingStatusSelectors } from '@/shared/store/tradingStatusSlice';
const PriceTable = () => {
  const [exchangers, setExchangers] = useState<any>({});

  const coins = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

  const updateData = async () => {
    const binanceData = await fetchBinancePrice(coins.join('|'));
    setExchangers(binanceData);
  };

  const tradingStatus = useAppSelector(tradingStatusSelectors.status);

  useEffect(() => {
    if (tradingStatus == 'trading') {
      const intervalId = setInterval(updateData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [tradingStatus]);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-2" colSpan={5}>
              Binance
            </th>
          </tr>
          <tr>
            <th className="border border-slate-600 p-2">Монета</th>
            <th className="border border-slate-600 p-2">Цена спот</th>
            <th className="border border-slate-600 p-2">Цена фьючерс</th>
            <th className="border border-slate-600 p-2">Конвертация покупка</th>
            <th className="border border-slate-600 p-2">Конвертация продажа</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            return (
              <tr key={coin}>
                <td className="border border-slate-600 p-2">
                  {coin.replace('USDT', '')}
                </td>
                <td className="border border-slate-600 p-2">
                  {
                    exchangers?.spot?.find((item: any) => item.symbol == coin)
                      .bidPrice
                  }
                </td>
                <td className="border border-slate-600 p-2">
                  {
                    exchangers?.futures?.find(
                      (item: any) => item.symbol == coin
                    ).bidPrice
                  }
                </td>
                <td className="border border-slate-600 p-2">
                  {
                    exchangers?.spot?.find((item: any) => item.symbol == coin)
                      .bidPrice
                  }
                </td>
                <td className="border border-slate-600 p-2">
                  {
                    exchangers?.spot?.find((item: any) => item.symbol == coin)
                      .askPrice
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
