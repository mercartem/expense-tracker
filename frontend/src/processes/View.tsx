import { useEffect, useState } from 'react';
import getBalance from '../entities/Balance/api/getBalance';
import { getToken } from '../shared/utils/utils';
import Header from '../widgets/Header/ui/Header';
import Navbar from '../widgets/Navbar/ui/Navbar';

function View() {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = getToken() as string;
      const currentBalance = await getBalance(token);
      setBalance(currentBalance);
    }
    fetchData();
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width > 770 ? <Navbar balance={balance} /> : <Header balance={balance} />;
}

export default View;
