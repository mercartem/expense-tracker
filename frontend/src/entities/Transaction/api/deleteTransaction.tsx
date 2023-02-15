import server from '../../../shared/constants/url';

async function removeTransaction(id: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${server}/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.status === 500) {
      const error = (await response.json()).message as string;
      throw new Error(error);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export default removeTransaction;
