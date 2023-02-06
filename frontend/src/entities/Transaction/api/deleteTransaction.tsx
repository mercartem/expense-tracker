import server from '../../../shared/constants/url';

async function removeTransaction(id: string, token: string): Promise<void> {
  await fetch(`${server}/user/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
}

export default removeTransaction;
