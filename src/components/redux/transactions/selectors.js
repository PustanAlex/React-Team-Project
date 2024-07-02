import { createSelector } from '@reduxjs/toolkit';

export function selectTransactions(state) {
  return state.transactions.transactions;
}

export function selectCategories(state) {
  return state.transactions.categories;
}

export const selectFilteredCategories = createSelector(
  [selectCategories],
  categories => categories.filter(category => category.type === "EXPENSE")
);

