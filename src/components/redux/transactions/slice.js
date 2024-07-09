import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsCategories, getAllTransactions, addTransaction, updatedTransaction, deleteTransaction, getTransactionsSummary } from './operations';

const initialState = {
  transactions: [],
  categories: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.loading = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updatedTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatedTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatedTransaction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsSummary.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTransactionsSummary.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default transactionsSlice.reducer;
