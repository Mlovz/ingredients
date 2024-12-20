import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorReducer } from './constructor/constructorSlice';
import { userReducer } from './user/userSlice';
import { profile } from 'console';
import { profileReducer } from './profile/profileSlice';

const rootReducer = combineReducers({
  ingredients: constructorReducer,
  user: userReducer,
  profile: profileReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
