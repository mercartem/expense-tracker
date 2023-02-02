import server from '../../../shared/constants/url';

async function createBalance(balance: string, id: string): Promise<Response> {
  const res = await fetch(`${server}/balance/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ balance }),
  });
  const result = await res.json();
  return result;
}

export default createBalance;
