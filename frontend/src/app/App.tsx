import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from '../pages/Main/auth/AuthContext';
import './style/App.scss';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  /* TODO: заменить логику проверки пользователя при передаче токена */

  useEffect(() => {
    if (localStorage.getItem('auth')) {
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

