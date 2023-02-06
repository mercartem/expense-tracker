import { Outlet } from 'react-router-dom';
import View from '../../../processes/View';

interface LayoutProps {
  children: React.ReactNode;
}

export function UserPageLayout({ children }: LayoutProps) {
  return (
    <main className='page'>
      <View />
      {children}
    </main>
  );
}

export function UserPage () {
  return (
    <main className='page'>
      <View />
      <Outlet/>
    </main>
  );
}

