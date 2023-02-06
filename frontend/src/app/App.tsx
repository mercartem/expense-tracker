import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from './context/AuthContext';
import './style/App.scss';
import { getToken } from '../shared/utils/utils';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
