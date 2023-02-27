import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/ui/Dashboard';
import AuthContext from '../context/AuthContext';
import Intro from '../../pages/main/ui/Intro';
import MainPage from '../../pages/main/ui/MainPage';
import Settings from '../../pages/Settings/ui/Settings';
import Transactions from '../../pages/Transactions/ui/Transactions';
import LoginForm from '../../widgets/Loginform/ui/LoginForm';
import RegisterForm from '../../widgets/RegisterForm/ui/RegisterForm';
import { privateRoutes, publicRoutes } from './routes';
import ErrorPage from '../../pages/404/ui/ErrorPage';
import UserPageLayout from '../../processes/UserPageLayout';

function AppRouter() {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Routes>
      {publicRoutes.map((routPath) => (
        <Route path={routPath} key={routPath} element={<Navigate to='/user/dashboard' />} />
      ))}
      <Route path='/' element={<UserPageLayout />}>
        <Route path='user/dashboard' element={<Dashboard />} />
        <Route path='user/transactions' element={<Transactions />} />
        <Route path='user/settings' element={<Settings />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
      <Route path='/404' element={<ErrorPage />} />
    </Routes>
  ) : (
    <Routes>
      {privateRoutes.map((routPath) => (
        <Route path={routPath} key={routPath} element={<Navigate to='/' />} />
      ))}
      <Route path='/' element={<MainPage />}>
        <Route index element={<Intro />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='sign' element={<RegisterForm />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
      <Route path='/404' element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
