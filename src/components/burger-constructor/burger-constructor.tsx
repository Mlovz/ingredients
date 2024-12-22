import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  addFetchIngredients,
  getOrderNumber
} from '../../services/constructor/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.ingredients.constructorItems
  );
  const orderRequest = useSelector((state) => state.ingredients.orderRequest);
  const orderModalData = useSelector(
    (state) => state.ingredients.orderModalData
  );

  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // dispatch(addFetchIngredients(constructorItems));
    const bunID = constructorItems.bun._id;
    const ingredients = constructorItems.ingredients.map((item) => item._id);
    dispatch(addFetchIngredients([bunID, ...ingredients]));
  };

  const closeOrderModal = () => {};

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
