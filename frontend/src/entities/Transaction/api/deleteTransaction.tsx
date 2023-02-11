import server from '../../../shared/constants/url';

async function removeTransaction(id: string, token: string): Promise<void> {
  try {
    await fetch(`${server}/transactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
} catch(error) {
  if(error instanceof Error) {
    throw new Error(error.message)
  }
}
}

export default removeTransaction;
