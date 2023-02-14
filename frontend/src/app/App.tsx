import { Suspense, useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from './context/AuthContext';
import './style/App.scss';
import { getToken, tokenExist } from '../shared/utils/utils';

function App() {
  const [isAuth, setIsAuth] = useState(tokenExist());

  useEffect(() => {
    if (getToken()) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Suspense fallback='...is loading'>
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
