import { getFeedsApi, getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface FeedState {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  ingredients: TIngredient[];
}

const initialState: FeedState = {
  isLoading: false,
  error: null,
  orders: [],
  ingredients: [],
  total: 0,
  totalToday: 0
};

// export const getOrderNumber = createAsyncThunk(
//   'constructor/getOrderNumber',
//   (number: number) => getOrderByNumberApi(number)
// );

export const getIngredients = createAsyncThunk(
  'ingredient/get',
  getIngredientsApi
);
export const getFeed = createAsyncThunk('feed/get', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectedFeedState: (state) => state
  },
  extraReducers(builder) {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
        state.orders = action.payload.orders;
      })
      .addCase(getFeed.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Произошла ошибка';
      });
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
  }
});

export const feedReduser = feedSlice.reducer;
export const { selectedFeedState } = feedSlice.selectors;
export const feedActions = feedSlice.actions;
