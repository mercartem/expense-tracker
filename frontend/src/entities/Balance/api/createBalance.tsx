import server from '../../../shared/constants/url';

async function createBalance(balance: string, id: string, token: string): Promise<void> {
  await fetch(`${server}/balance/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ balance }),
  });
}

export default createBalance;
