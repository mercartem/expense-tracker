import {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '../../pages/main/auth/AuthContext';
import MainPage from '../../pages/main/MainPage';
import { privateRoutes, publicRoutes } from './routes';

function AppRouter () {
const {isAuth} = useContext(AuthContext);
  return (
    isAuth
    ?
    <Routes>
      {publicRoutes.map((routPath) => <Route path={routPath} key={routPath} element={<Navigate to='/dashboard'/>}/>)}
      <Route path='/dashboard' element={<h1>dashboard</h1>} />
      <Route path='/transactions' element={<h1>transactions</h1>} />
      <Route path='/settings' element={<h1>settings</h1>} />
      <Route path='*' element={<h1>NOT FOUND</h1>}/>
    </Routes>
    :
    <Routes>
      {privateRoutes.map((routPath) => <Route path={routPath} key={routPath} element={<Navigate to='/'/>}/>)}
      <Route path='/' element={<MainPage/>}>
        <Route path='login' element={<h1>login</h1>}/>
        <Route path='sign' element={<h1>registration</h1>}/>
      </Route>
      <Route path='*' element={<h1>NOT FOUND</h1>}/>
    </Routes> 
  )
}

export default AppRouter

