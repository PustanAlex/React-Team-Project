import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setToken } from '../../API/apiAuth'; 

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    setToken(token); 

    const response = await axios.get('https://wallet.b.goit.study/api/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('https://wallet.b.goit.study/api/auth/sign-up', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('https://wallet.b.goit.study/api/auth/sign-in', credentials);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('https://wallet.b.goit.study/api/auth/sign-out', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});
