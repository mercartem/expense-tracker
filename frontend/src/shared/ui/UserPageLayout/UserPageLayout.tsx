import { Outlet } from 'react-router-dom';
import View from '../../../processes/View';

function UserPageLayout() {
  return (
    <main className='page'>
      <View />
      <Outlet />
    </main>
  );
}

export default UserPageLayout;
