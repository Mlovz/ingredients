import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import {
  getProfileOrders,
  profileSelectors
} from '../../services/profile/profileSlice';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  const orders = useSelector(profileSelectors.selectedProfileStore).orders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
