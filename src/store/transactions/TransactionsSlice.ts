import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockTransactions } from 'features/transactions/components/MockTransactions';
import { TransactionType } from 'features/transactions/model/TransactionType';

interface TransactionsState {
  list: TransactionType[];
  editing: TransactionType | null;
}

const initialState: TransactionsState = {
  list: mockTransactions,
  editing: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionType>) => {
      state.list.push(action.payload);
    },
    editTransaction: (state, action: PayloadAction<{ id: string; data: Partial<TransactionType> }>) => {
      const index = state.list.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.data };
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    setEditingTransaction: (state, action: PayloadAction<TransactionType | null>) => {
      state.editing = action.payload;
    },
  },
});

export const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  setEditingTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
