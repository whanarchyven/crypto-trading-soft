import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exchangerInterface } from '@/shared/utils/getExchangersTemp';

interface ITradingSettingsSliceState {
  settings: {
    id: exchangerInterface['name'];
    spotFee: number;
    futuresFee: number;
    deposit: number;
  }[];
}

const initialState: ITradingSettingsSliceState = {
  settings: [
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
  ],
};

const TradingSettingsSlice = createSlice({
  name: 'tradingSettings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ITradingSettingsSliceState>) => {
      state.settings = action.payload.settings;
    },
  },
});

export const tradingSettingsActions = TradingSettingsSlice.actions;

export const tradingSettingsSelectors = {
  settings: (state: RootState) => state.tradingSettings.settings,
};

export default TradingSettingsSlice.reducer;
