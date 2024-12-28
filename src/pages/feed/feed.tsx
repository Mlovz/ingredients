import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, selectedFeedState } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const ordersState: TOrder[] | null = useSelector(selectedFeedState).orders;

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const orders: TOrder[] = ordersState;
  function handleGetFeeds() {
    dispatch(getFeed());
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
