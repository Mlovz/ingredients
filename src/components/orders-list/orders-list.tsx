import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../../services/profile/profileSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const selectedOrdersisLoading = useSelector(
    profileSelectors.selectedProfileStore
  ).isLoading;

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (selectedOrdersisLoading) {
    return <Preloader />;
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
