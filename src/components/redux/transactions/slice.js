import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsCategories, getAllTransactions, addTransaction, updatedTransaction, deleteTransaction, getTransactionsSummary } from './operations';

const today = new Date();
const initialState = {
  categories: [],
  transactions: [],
  summary: {
    "categoriesSummary": [
      /* {
        "name": "Main expenses",
        "type": "EXPENSE",
        "total": -21
      } */
    ],
    "incomeSummary": 0,
    "expenseSummary": 0,
    "periodTotal": NaN,
    "year": today.getFullYear(),
    "month": today.getMonth() + 1
  },
  loading: false,
  error: null,
};

// const settled = (state) => {
//   state.loading = false;
// }
const rejected = (state, action) => {
  state.error = action.payload;
  state.loading = false;
}
const pending = (state) => {
  state.loading = true;
}
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, pending)
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsCategories.rejected, rejected)
      .addCase(getAllTransactions.pending, pending)
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(getAllTransactions.rejected, rejected)
      .addCase(addTransaction.pending, pending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.loading = false;
      })
      .addCase(addTransaction.rejected, rejected)
      .addCase(updatedTransaction.pending, pending)
      .addCase(updatedTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatedTransaction.rejected, rejected)
      .addCase(deleteTransaction.pending, pending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, rejected)
      .addCase(getTransactionsSummary.pending, pending)
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsSummary.rejected, rejected);
  },
});

export default transactionsSlice.reducer;
