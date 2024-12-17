import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserState {
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
}

const loginUser = createAsyncThunk('user/login', loginUserApi);
const forgotPassword = createAsyncThunk(
  'user/frogotPassword',
  forgotPasswordApi
);
const resetPassword = createAsyncThunk('user/resetPassword', resetPasswordApi);
const logout = createAsyncThunk('user/logout', logoutApi);
const updateUser = createAsyncThunk('user/update', updateUserApi);

const registerUser = createAsyncThunk('user/register', registerUserApi);

const getUser = createAsyncThunk('user/get', getUserApi);

const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectedUserIsLoading: (state) => state.isLoading,
    selectedUser: (state) => state.user,
    selectedUserError: (state) => state.error
  },

  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.user = payload.user;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      });
  }
});
