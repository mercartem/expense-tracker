import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/ui/Dashboard';
import AuthContext from '../context/AuthContext';
import Intro from '../../pages/main/ui/Intro';
import MainPage from '../../pages/main/ui/MainPage';
import Settings from '../../pages/Settings/ui/Settings';
import Transactions from '../../pages/Transactions/ui/Transactions';
import View from '../../processes/View';
import LoginForm from '../../widgets/Loginform/ui/LoginForm';
import RegisterForm from '../../widgets/RegisterForm/ui/RegisterForm';
import { privateRoutes, publicRoutes } from './routes';

function AppRouter() {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Routes>
      {publicRoutes.map((routPath) => (
        <Route path={routPath} key={routPath} element={<Navigate to='/dashboard' />} />
      ))}
      <Route
        path='/dashboard'
        element={
          <main className='page'>
            <View />
            <Dashboard />
          </main>
        }
      />
      <Route
        path='/transactions'
        element={
          <main className='page'>
            <View />
            <Transactions />
          </main>
        }
      />
      <Route
        path='/settings'
        element={
          <main className='page'>
            <View />
            <Settings />
          </main>
        }
      />
      <Route path='*' element={<h1>NOT FOUND</h1>} />
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
      <Route path='*' element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
}

export default AppRouter;
