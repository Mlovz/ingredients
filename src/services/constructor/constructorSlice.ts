import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface IConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  ingredients: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
  isLoading: boolean;
  orderStatus: boolean;
}

export const fetchIngredients = createAsyncThunk(
  'constructor/fetchIngredients',
  getIngredientsApi
);

export const addFetchIngredients = createAsyncThunk(
  'constructor/addFetchIngredients',
  (data: string[]) => orderBurgerApi(data)
);

export const getOrderNumber = createAsyncThunk(
  'constructor/getOrderNumber',
  (number: number) => getOrderByNumberApi(number)
);

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null,
  orderRequest: false,
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  },
  isLoading: false,
  orderStatus: false
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setAddIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients = [
          ...state.constructorItems.ingredients,
          { ...action.payload, id: nanoid() }
        ];
      }
    },
    setRemoveIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload._id
        );
    }
  },
  selectors: {
    selectedConstructorStore: (state) => state
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = {
          buns: action.payload.filter(
            (item: TIngredient) => item.type === 'bun'
          ),
          mains: action.payload.filter(
            (item: TIngredient) => item.type === 'main'
          ),
          sauces: action.payload.filter(
            (item: TIngredient) => item.type === 'sauce'
          )
        };
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFetchIngredients.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        addFetchIngredients.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload.order;
        }
      );
  }
});

export const constructorActions = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
export const { selectedConstructorStore } = constructorSlice.selectors;

// export const selectedConstructorIsLoading = (state: IConstructorState) =>
//   state.isLoading;
// export const selectedConstructorBuns = (state: IConstructorState) =>
//   state.ingredients.buns || ;
// export const selectedConstructorMains = (state: IConstructorState) =>
//   state.ingredients.mains;
// export const selectedConstructorSauces = (state: IConstructorState) =>
//   state.ingredients.sauces;
