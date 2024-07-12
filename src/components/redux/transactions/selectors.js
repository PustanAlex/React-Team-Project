import { createSelector } from '@reduxjs/toolkit';
export const selectTransactions = (state) => state.transactions.transactions;
export const selectCategories = (state) => state.transactions.categories;
export const selectFilteredCategories = createSelector(
  [selectCategories],
  categories => categories.filter(category => category.type === "EXPENSE")
);

export const selectorSummary = state => state.transactions.summary;
export const selectorIsLoading = state => state.transactions.loading;


