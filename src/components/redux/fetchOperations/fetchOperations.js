import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../API/apiAuth';

export const fetchOperations = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createOperation = createAsyncThunk(
  'transaction/addTransaction',
  async (operationData, thunkAPI) => {
    try {
      const response = await api.post('/transactions', operationData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
