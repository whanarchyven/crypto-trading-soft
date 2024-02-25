import React, { FC } from 'react';
import { cva } from 'class-variance-authority';

const cvaTableRoot = cva([
  'border-collapse w-full border table-fixed border-slate-500',
]);
const cvaTableSection = cva(['border p-1 text-sm border-cPurple'], {
  variants: {
    isProfit: {
      true: 'text-green-600',
      false: 'text-red-600',
      default: 'text-black',
    },
  },
  defaultVariants: {
    isProfit: 'default',
  },
});

const operations = [
  {
    buy: {
      exchanger: 'binance',
      market: 'spot',
    },
    sell: {
      exchanger: 'binance',
      market: 'spot',
    },
    marge: 0.005,
    coin: 'ETH',
  },
  {
    buy: {
      exchanger: 'Huobi',
      market: 'future',
    },
    sell: {
      exchanger: 'OKX',
      market: 'future',
    },
    marge: 0.003,
    coin: 'BTC',
  },
  {
    buy: {
      exchanger: 'Huobi',
      market: 'future',
    },
    sell: {
      exchanger: 'OKX',
      market: 'future',
    },
    marge: 0.003,
    coin: 'BTC',
  },
  {
    buy: {
      exchanger: 'Huobi',
      market: 'future',
    },
    sell: {
      exchanger: 'OKX',
      market: 'future',
    },
    marge: 0.003,
    coin: 'BTC',
  },
  {
    buy: {
      exchanger: 'Huobi',
      market: 'future',
    },
    sell: {
      exchanger: 'OKX',
      market: 'future',
    },
    marge: 0.003,
    coin: 'BTC',
  },
  {
    buy: {
      exchanger: 'Huobi',
      market: 'future',
    },
    sell: {
      exchanger: 'OKX',
      market: 'future',
    },
    marge: 0.003,
    coin: 'BTC',
  },
];

const cvaRoot = cva(['w-full h-full']);
const cvaGrid = cva(['grid grid-cols-5 font-bold pr-[2px]']);
const cvaMaxHeight = cva(['max-h-[500px] overflow-y-scroll']);
const cvaGridInner = cva(['grid grid-cols-5']);

const OperationsHistory: FC = () => {
  return (
    <div className={cvaRoot()}>
      <div className={cvaTableRoot()}>
        <div className={cvaGrid()}>
          {['Маржа', 'Биржа', 'Операция', 'Рынок', 'Монета'].map(
            (header, index) => (
              <div key={index} className={cvaTableSection()}>
                {header}
              </div>
            )
          )}
        </div>
        <div className={cvaMaxHeight()}>
          {operations.map((operation, index) => {
            const marge = operation.marge * 100;
            const margeString = `${marge > 0 ? '+' : '-'} ${marge}%`;
            return (
              <React.Fragment key={index}>
                <div className={cvaGridInner()}>
                  <div className={cvaTableSection({ isProfit: marge > 0 })}>
                    {margeString}
                  </div>
                  <div className={cvaTableSection()}>
                    {operation.buy.exchanger}
                  </div>
                  <div className={cvaTableSection()}>Покупка</div>
                  <div className={cvaTableSection()}>
                    {operation.buy.market}
                  </div>
                  <div className={cvaTableSection()}>{operation.coin}</div>
                </div>
                <div className={cvaGridInner()}>
                  <div className={cvaTableSection()}></div>
                  <div className={cvaTableSection()}>
                    {operation.sell.exchanger}
                  </div>
                  <div className={cvaTableSection()}>Продажа</div>
                  <div className={cvaTableSection()}>
                    {operation.sell.market}
                  </div>
                  <div className={cvaTableSection()}>{operation.coin}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OperationsHistory;
