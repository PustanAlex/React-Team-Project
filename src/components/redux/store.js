import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import modalReducer from '../ModalComponents/ModalSlice/ModalSlice';

const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem('user')),
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
  },
  modal: {
    operations: [],
    newOperation: {
      id: '',
      date: '',
      type: 'INCOME',
      category: '',
      comment: '',
      sum: '',
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
  },
  preloadedState,
});

export default store;
