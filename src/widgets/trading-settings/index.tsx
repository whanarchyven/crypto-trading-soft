'use client';
import React, { useState } from 'react';
import { exchangerInterface } from '@/shared/utils/getExchangersTemp';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import {
  tradingStatusActions,
  tradingStatusSelectors,
} from '@/shared/store/tradingStatusSlice';
import { cva } from 'class-variance-authority';
import Button from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import { tradingSettingsActions } from '@/shared/store/tradingSettingsSlice';

interface exchangerStateInterface {
  id: exchangerInterface['name'];
  spotFee: number;
  futuresFee: number;
  deposit: number;
}

const cvaRoot = cva(['my-3 flex flex-col text-sm items-center gap-2']);
const cvaTableRoot = cva([
  'border-collapse w-full border table-fixed border-slate-500',
]);
const cvaTableSection = cva(['border p-1 border-cPurple']);
const cvaExchangerTitle = cva(['border p-1 border-cPurple capitalize']);
const cvaInputContainer = cva([
  'flex items-center w-full h-full justify-center',
]);
const cvaInput = cva(['focus:outline-none w-full text-center h-full'], {
  variants: {
    isDisabled: {
      true: 'text-cPurple opacity-50',
      false: 'text-black opacity-100',
    },
  },
});
const cvaButton = cva(['bg-cPurple flex w-fit p-1 text-white rounded-lg']);
const TradingSettings = () => {
  const [exchangersState, setExchangersState] = useState<
    Array<exchangerStateInterface>
  >([
    {
      id: 'binance',
      spotFee: 0,
      futuresFee: 0,
      deposit: 0,
    },
    {
      id: 'bybit',
      spotFee: 0,
      futuresFee: 0,
      deposit: 0,
    },
  ]);

  const tradingStatus = useAppSelector(tradingStatusSelectors.status);
  const dispatch = useAppDispatch();
  const mutateState = (
    counter: number,
    parameter: keyof exchangerStateInterface,
    value: number
  ) => {
    const temp: Array<any> = [...exchangersState];
    temp[counter][parameter] = Number(value);
    setExchangersState([...temp]);
  };

  return (
    <div className={cvaRoot()}>
      <table className={cvaTableRoot()}>
        <thead>
          <tr>
            <th className={cvaTableSection()}>Биржа</th>
            <th className={cvaTableSection()}>Коммисия спот (%)</th>
            <th className={cvaTableSection()}>Коммисия фьючерс (%)</th>
            <th className={cvaTableSection()}>Депозит (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {exchangersState.map((exchanger, counter) => (
            <tr key={counter}>
              <td className={cvaExchangerTitle()}>{exchanger.id}</td>
              {Object.keys(exchanger).map((item: string) => {
                if (item !== 'id') {
                  const key = item as keyof exchangerStateInterface;
                  const disabled = tradingStatus !== 'not-running';
                  return (
                    <td key={key} className={cvaTableSection()}>
                      <div className={cvaInputContainer()}>
                        <input
                          disabled={disabled}
                          value={exchanger[key]}
                          onChange={(event) => {
                            mutateState(
                              counter,
                              key,
                              parseInt(event.target.value, 10)
                            );
                          }}
                          placeholder={'0'}
                          className={cvaInput({ isDisabled: disabled })}
                        />
                      </div>
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          dispatch(tradingStatusActions.setStatus('trading'));
          dispatch(
            tradingSettingsActions.setSettings({ settings: exchangersState })
          );
        }}
        className={cvaButton()}
        isLoading={tradingStatus == 'trading'}>
        {tradingStatus == 'trading' ? 'Торгуем' : 'Запустить торги'}
      </Button>
    </div>
  );
};

export default TradingSettings;
