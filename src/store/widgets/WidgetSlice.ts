import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WidgetState {
  revenueUpdates: boolean;
  transactions: boolean;
  monthlyEarnings: boolean;
  yearlyBreakup: boolean;
  lastTransactions: boolean;
}

const initialState: WidgetState = {
  revenueUpdates: true,
  transactions: true,
  monthlyEarnings: true,
  yearlyBreakup: true,
  lastTransactions: true,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidget(state, action: PayloadAction<keyof WidgetState>) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
