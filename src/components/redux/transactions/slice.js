import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  getTransactionsCategories, updatedTransaction,
} from './operations';

const initialState = {
  categories: [],
  transactions: [],
};

const slice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransactionsCategories.fulfilled, (state, { payload }) => {
        state.categories = payload
      })
      .addCase(getAllTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
        state.auth.user.balance = payload.balanceAfter;
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        const transactionIndex = state.transactions.findIndex(t => t.id === payload)
        state.auth.user.balance -= state.transactions[transactionIndex].amount;
        state.transactions.splice(transactionIndex, 1)
      })
      .addCase(updatedTransaction.fulfilled, (state, { payload }) => {
        const transactionIndex = state.transactions.findIndex(t => t.id === payload.id)
        state.transactions[transactionIndex] = payload
        state.auth.user.balance = payload.balanceAfter;
      });
  },
});

export const transactionsReducer = slice.reducer;
