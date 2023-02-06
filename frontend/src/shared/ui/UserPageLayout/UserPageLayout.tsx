import View from '../../../processes/View';

interface LayoutProps {
  children: React.ReactNode;
}

function UserPageLayout({children}:LayoutProps) {
  return (
    <main className='page'>
      <View />
      {children}
    </main>
  );
}

export default UserPageLayout;
