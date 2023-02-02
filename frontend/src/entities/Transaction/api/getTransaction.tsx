import server from '../../../shared/constants/url';

async function getTransaction(id: string) {
  const res = await fetch(`${server}/transactions/${id}`);
  const transaction = await res.json();
  return transaction;
}

export default getTransaction;
