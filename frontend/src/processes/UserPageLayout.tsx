import { Outlet } from 'react-router-dom';
import View from './View';

function UserPageLayout() {
  return (
    <main className='page'>
      <View />
      <Outlet />
    </main>
  );
}

export default UserPageLayout;
