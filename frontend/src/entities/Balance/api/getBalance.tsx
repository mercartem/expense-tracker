import server from '../../../shared/constants/url';

async function getBalance() {
  const res = await fetch(`${server}/balance`);
  const balance = await res.json();
  return balance;
}

export default getBalance;
