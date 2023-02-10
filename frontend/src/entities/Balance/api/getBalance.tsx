import server from '../../../shared/constants/url';

async function getBalance(token: string): Promise<string> {
  const res = await fetch(`${server}/balance`, {
    headers: {
      Authorization: token,
    },
  });
  if (res.status === 404) {
    return '0';
  }
  const result = (await res.json()) as string;
  return result;
}

export default getBalance;
