import { createContext } from 'react';
import getBalance from '../../entities/Balance/api/getBalance';
import { getToken } from '../../shared/utils/utils';

interface IBalanceContext {
  balance: string;
  updateBalance: () => Promise<void>;
}

const defaultBalanceState = {
  balance: '',
  async updateBalance() {
    const token = getToken() as string;
    const currentBalance = await getBalance(token);
  },
};

const BalanceContext = createContext<IBalanceContext>(defaultBalanceState);

export default BalanceContext;
