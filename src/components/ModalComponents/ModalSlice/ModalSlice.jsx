import { createSlice } from '@reduxjs/toolkit';
import { fetchOperations, addTransaction } from '../../redux/fetchOperations/fetchOperations';

const initialState = {
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
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setNewOperation: (state, action) => {
      state.newOperation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperations.fulfilled, (state, action) => {
        state.loading = false;
        state.operations = action.payload;
      })
      .addCase(fetchOperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.operations.push(action.payload);
        state.isModalOpen = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { openModal, closeModal, setNewOperation } = modalSlice.actions;
export default modalSlice.reducer;
