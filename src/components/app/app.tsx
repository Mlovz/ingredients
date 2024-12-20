import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, userSelectors } from '../../services/user/userSlice';
import { GuestRoute } from '../guesr-route/guestoRouter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <GuestRoute authorized={false}>
              <Login />
            </GuestRoute>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route
          path='/profile'
          element={
            <GuestRoute authorized>
              <Profile />
            </GuestRoute>
          }
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
