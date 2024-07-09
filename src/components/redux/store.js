import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import modalReducer from '../ModalComponents/ModalSlice/ModalSlice';
import transactionsReducer from './transactions/slice';

const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem('user')),
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
  },
  modal: {
    operations: [],
    newOperation: {
      transactionDate: '',
      type: '',
      categoryId: '',
      comment: '',
      amount: '',
    },
    isModalOpen: false,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    transactions: transactionsReducer,
  },
  preloadedState,
});

export default store;
