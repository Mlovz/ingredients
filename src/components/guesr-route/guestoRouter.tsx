import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/user/userSlice';
import { Navigate } from 'react-router-dom';

export const GuestRoute = ({
  children,
  authorized
}: {
  children: JSX.Element;
  authorized: boolean;
}) => {
  const authData = useSelector(userSelectors.selectedUser);

  if (authorized && !authData) {
    return <Navigate to='/login' />;
  }

  if (!authorized && authData) {
    return <Navigate to='/profile' />;
  }

  return children;
};
