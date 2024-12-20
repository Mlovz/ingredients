import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface ProfileSchema {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

export const getProfileOrders = createAsyncThunk(
  'profile/getOrders',
  getOrdersApi
);

const initialState: ProfileSchema = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectedProfileStore: (state) => state
  }
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
export const profileSelectors = profileSlice.selectors;
