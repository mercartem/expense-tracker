import server from '../../../shared/constants/url';

async function createBalance(balance: string): Promise<Response> {
  const res = await fetch(`${server}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ balance }),
  });
  return res;
}

export default createBalance;
