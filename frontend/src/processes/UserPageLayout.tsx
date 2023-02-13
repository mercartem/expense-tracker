import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import BalanceContext from '../app/context/BalanceContext';
import getBalance from '../entities/Balance/api/getBalance';
import { getToken } from '../shared/utils/utils';
import View from './View';

function UserPageLayout() {
  const [balance, setBalance] = useState('');

  async function fetchData() {
    const token = getToken() as string;
    const currentBalance = await getBalance(token);
    setBalance(currentBalance.toLocaleString());
  }

  const updateBalance = async () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <BalanceContext.Provider
       value={{
        balance,
        updateBalance
      }}>
        <main className='page'>
      <View />
      <Outlet />
    </main>
    </BalanceContext.Provider>
    
  );
}

export default UserPageLayout;
