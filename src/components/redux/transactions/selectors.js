import { createSelector } from '@reduxjs/toolkit';
export const selectTransactions = (state) => state.transactions.transactions;
export const selectCategories = (state) => state.transactions.categories;
export const selectFilteredCategories = createSelector(
  [selectCategories],
  categories => categories.filter(category => category.type === "EXPENSE")
);

export const selectorSummaryTr = state => state.transactions.summary;


