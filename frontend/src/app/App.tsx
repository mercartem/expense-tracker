import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from './context/AuthContext';
import './style/App.scss';

function App() {
  const [isAuth, setIsAuth] = useState(false);
 
  useEffect(() => {
    if (localStorage.getItem('token')) {
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
