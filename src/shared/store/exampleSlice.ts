import { RootState } from '@/shared/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITradingStatusSliceState {
  status: 'not-running' | 'trading' | 'finished' | 'error';
}

const initialState: ITradingStatusSliceState = {
  status: 'not-running',
};

const TradingStatusSlice = createSlice({
  name: 'tradingStatus',
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<ITradingStatusSliceState['status']>
    ) => {
      state.status = action.payload;
    },
  },
});

export const tradingStatusActions = TradingStatusSlice.actions;

export const tradingStatusSelectors = {
  status: (state: RootState) => state.tradingStatus.status,
};

export default TradingStatusSlice.reducer;
