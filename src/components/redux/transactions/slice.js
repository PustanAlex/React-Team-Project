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
  balance: 0,
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
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, pending)
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getTransactionsCategories.rejected, rejected)
      .addCase(getAllTransactions.pending, pending)
      .addCase(getAllTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload;
        state.balance = payload.reduce((acc, t) => acc + t.amount, 0);
        state.loading = false;
      })
      .addCase(getAllTransactions.rejected, rejected)
      .addCase(addTransaction.pending, pending)
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.transactions.push(payload);
        state.balance += payload.amount;
        state.loading = false;
      })
      .addCase(addTransaction.rejected, rejected)
      .addCase(updatedTransaction.pending, pending)
      .addCase(updatedTransaction.fulfilled, (state, { payload }) => {
        const oldTransaction = state.transactions.find(transaction => transaction.id === payload.id);
        if (oldTransaction) {
          const deltaAmount = payload.amount - oldTransaction.amount;
          state.balance += deltaAmount;
          // state.balance = payload.balanceAfter;
          Object.assign(oldTransaction, payload);
        }
        state.loading = false;
      })
      .addCase(updatedTransaction.rejected, rejected)
      .addCase(deleteTransaction.pending, pending)
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        const transactionIndex = state.transactions.findIndex(t => t.id === payload)
        if (transactionIndex !== -1) {
          state.balance -= state.transactions[transactionIndex].amount;
          state.transactions.splice(transactionIndex, 1)
        }
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
export const { setBalance } = transactionsSlice.actions;