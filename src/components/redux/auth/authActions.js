import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, api } from '../../API/apiAuth';

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    setToken(token);

    const response = await api.get('users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await api.post('auth/sign-up', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await api.post('auth/sign-in', credentials);
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete('auth/sign-out', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem('token');
    setToken(null);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
