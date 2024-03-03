'use client';
import React, { useEffect, useState } from 'react';
import { fetchBybitPrice } from '@/shared/api/exchagers-data-fetching/fetchBybitPrice';
import { fetchBinancePrice } from '@/shared/api/exchagers-data-fetching/fetchBinancePrice';

interface TableData {
  headers: string[];
  rows: string[];
  subHeaders: string[];
}

const PriceTable = () => {
  const [exchangers, setExchangers] = useState<any>([
    { name: 'binance', data: {} },
    { name: 'bybit', data: {} },
  ]);

  const updateData = async () => {
    const binanceData = await fetchBinancePrice('BTCUSDT|ETHUSDT');
    const bybitData = await fetchBybitPrice('BTCUSDT|ETHUSDT|BTCUSD|ETHUSD');
    setExchangers([
      { name: 'binance', data: binanceData },
      { name: 'bybit', data: bybitData },
    ]);
  };

  useEffect(() => {
    const intervalId = setInterval(updateData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const data: TableData = {
    headers: ['Binance', 'Bybit'],
    rows: ['BTC', 'ETH', 'BNB'],
    subHeaders: ['spot', 'futures', 'Конв пок', 'Конв прод'],
  };

  const findData = (
    symbol: string,
    exchange: string,
    category: 'spot' | 'futures'
  ) => {
    const exchangeData = exchangers.find(
      (data: any) => data.name === exchange.toLowerCase()
    );
    // console.log('AAAAAAAAAAAA',category)
    // console.log(exchangeData)
    if (exchangeData?.data[category]) {
      const categoryData = exchangeData?.data[category].find(
        (data: any) => data.symbol === `${symbol}USDT`
      );
      return categoryData ? `${categoryData.bidPrice}` : '-';
    } else {
      return '-';
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-2" rowSpan={2}>
              Биржа
            </th>
            {data.headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-slate-600 p-2"
                colSpan={data.subHeaders.length}>
                {header}
              </th>
            ))}
          </tr>
          <tr>
            {data.headers.flatMap((_, idx) =>
              data.subHeaders.map((subHeader, subIdx) => (
                <th
                  key={`${idx}_${subIdx}`}
                  className="border border-slate-600 p-2">
                  {subHeader}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-slate-600 p-2">{row}</td>
              {data.headers.flatMap((header) =>
                data.subHeaders.map((subHeader) => (
                  <td
                    key={`${row}_${header}_${subHeader}`}
                    className="border border-slate-600 p-2">
                    {findData(
                      row,
                      header,
                      subHeader.toLowerCase() as 'spot' | 'futures'
                    )}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
