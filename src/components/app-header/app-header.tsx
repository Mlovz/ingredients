import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/user/userSlice';

export const AppHeader: FC = () => {
  const username = useSelector(userSelectors.selectedUser)?.name;

  return <AppHeaderUI userName={username} />;
};
