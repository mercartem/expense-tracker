import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from '../pages/main/auth/AuthContext';
import './App.scss';

function App() {
  const [isAuth, setIsAuth] = useState(true);
  
  /* TODO: заменить логику проверки пользователя при передаче токена */ 

  useEffect(()=> {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <AppRouter/>
    </AuthContext.Provider>
  )
}

export default App;