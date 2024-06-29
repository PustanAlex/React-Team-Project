const { createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const fetchOperations = createAsyncThunk(
// TODO: add fetch
    'transtactions/fetchAll',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get('/transactions');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectwithValue(error.message);
        }
    }
);

export const createOperation = createAsyncThunk(
    'transaction/addTransaction',
    async (operationData, thunkAPI) => {
        try {
            const response = await axios.post('https://wallet.b.goit.study/api/transactions', operationData)
            return response.data;
        } catch (error) {
             return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)