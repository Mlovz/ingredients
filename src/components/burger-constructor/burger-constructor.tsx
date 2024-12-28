import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  addFetchIngredients,
  constructorActions
} from '../../services/constructor/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/user/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.ingredients.constructorItems
  );
  const orderRequest = useSelector((state) => state.ingredients.orderRequest);
  const orderModalData = useSelector(
    (state) => state.ingredients.orderModalData
  );
  const authData = useSelector(userSelectors.selectedUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (authData) {
      if (!constructorItems.bun || orderRequest) return;
      const bunID = constructorItems.bun._id;
      const ingredients = constructorItems.ingredients.map((item) => item._id);
      dispatch(addFetchIngredients([bunID, ...ingredients]));
      dispatch(constructorActions.setOrderRequest(true));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(constructorActions.setOrderRequest(false));
    dispatch(constructorActions.setNullOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
