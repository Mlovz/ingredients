import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { PageLoader } from '@ui';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../index.css';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/user/userSlice';
import { GuestRoute } from '../guesr-route/guestoRouter';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {}
      {/* TODO: позже внедрить */}
      {/* <PageLoader /> */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
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
