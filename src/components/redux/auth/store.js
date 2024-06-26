import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const preloadedState = {
  auth: {
    user: JSON.parse(localStorage.getItem('user')),
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export default store;
