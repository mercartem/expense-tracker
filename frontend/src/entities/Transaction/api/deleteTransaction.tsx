import server from '../../../shared/constants/url';

async function removeTransaction(id: string): Promise<void> {
  await fetch(`${server}/transactions/${id}`, { method: 'DELETE' });
}

export default removeTransaction;
