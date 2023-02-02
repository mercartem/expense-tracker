import server from '../../../shared/constants/url';

async function removeTransaction(id: string): Promise<Response> {
  const res = await fetch(`${server}/transactions/${id}`, { method: 'DELETE' });
  const result = await res.json();
  return result;
}

export default removeTransaction;
