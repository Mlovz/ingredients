import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type OrderState = {
  request: boolean;
  orders: TOrder[];
  getOrderNumberResponse: TOrder | null;
  error: string | null;
};

export const initialState: OrderState = {
  orders: [],
  request: false,
  getOrderNumberResponse: null,
  error: null
};

export const getOrderNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectedOrderState: (state) => state.getOrderNumberResponse,
    selectedOrderError: (state) => state.error,
    selectedOrderIsLoading: (state) => state.error === null
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderNumber.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(getOrderNumber.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.request = false;
    });
    builder.addCase(getOrderNumber.fulfilled, (state, action) => {
      state.error = null;
      state.request = false;
      state.getOrderNumberResponse = action.payload.orders[0];
    });
  }
});

export const getOrderState = (state: RootState): OrderState => state.order;
export const orderReduser = orderSlice.reducer;
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
