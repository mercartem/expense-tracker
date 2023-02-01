import { useEffect, useState } from 'react';
import Header from '../../../widgets/Header/ui/Header';
import Navbar from '../../../widgets/Navbar/ui/Navbar';

function Dashboard() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <main className='page'>
        {width > 770 && <Navbar />}
        <div>Дашбоард</div>
      </main>
    </>
  );
}

export default Dashboard;
