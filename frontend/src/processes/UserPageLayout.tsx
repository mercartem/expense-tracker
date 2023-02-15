import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AvatarContext } from '../app/context/AvatarContext';
import BalanceContext from '../app/context/BalanceContext';
import getBalance from '../entities/Balance/api/getBalance';
import getAvatarUser from '../entities/User/api/getAvatarUser';
import { getId, getToken } from '../shared/utils/utils';
import View from './View';
import money from '../shared/assets/money.svg';

function UserPageLayout() {
  const [balance, setBalance] = useState('');
  const [imageUrl, setImageUrl] = useState(money);
  const [avatarUpdateCount, setAvatarUpdateCount] = useState(0);

  async function fetchDataBalance() {
    const token = getToken() as string;
    const currentBalance = await getBalance(token);
    setBalance(currentBalance.toLocaleString());
  }

  const updateBalance = async () => {
    fetchDataBalance();
  };

  async function fetchDataAvatar() {
    const userId = getId() as string;
    const url = await getAvatarUser(userId);
    setImageUrl(url);
  }

  const updateAvatar = async () => {
    fetchDataAvatar();
    setAvatarUpdateCount((count) => count + 1);
  };

  useEffect(() => {
    fetchDataBalance();
    fetchDataAvatar();
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        updateBalance,
      }}
    >
      <AvatarContext.Provider value={{ imageUrl, updateAvatar, avatarUpdateCount }}>
        <main className='page'>
          <View />
          <Outlet />
        </main>
      </AvatarContext.Provider>
    </BalanceContext.Provider>
  );
}

export default UserPageLayout;
