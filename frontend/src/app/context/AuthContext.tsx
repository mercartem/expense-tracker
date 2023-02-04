import { createContext } from 'react';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const defaultAuthState = {
  isAuth: false,
  setIsAuth() {
   console.log('function should be overwritten');
  },
};

const AuthContext = createContext<IAuthContext>(defaultAuthState);

export default AuthContext;
