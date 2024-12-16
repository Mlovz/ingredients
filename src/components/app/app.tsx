import { ConstructorPage, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/constructor/constructorSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
