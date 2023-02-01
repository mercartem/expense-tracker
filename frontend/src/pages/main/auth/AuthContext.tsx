import { createContext, Dispatch, SetStateAction } from 'react';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth?: Dispatch<SetStateAction<boolean>>;
}

const defaultAuthState = {
  isAuth: false,
};

const AuthContext = createContext<IAuthContext>(defaultAuthState);

export default AuthContext;
