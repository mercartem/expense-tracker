import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppRouter from './router/AppRouter';
import AuthContext from './context/AuthContext';
import './style/App.scss';
import { getToken, tokenExist } from '../shared/utils/utils';

function App() {
  const [isAuth, setIsAuth] = useState(tokenExist());
  const {t} = useTranslation()

  useEffect(() => {
    if (getToken()) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Suspense fallback={t('loading')}>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
        }}
      >
        <AppRouter />
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
