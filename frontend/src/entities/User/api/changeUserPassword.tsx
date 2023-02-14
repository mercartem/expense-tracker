import server from '../../../shared/constants/url';

async function changeUserPassword(password: {password: string | undefined}, token: string) {
  const res = await fetch(`${server}/auth/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(password),
  });
  if (res.status === 403) {
    return (await res.json())[0].msg as string;
  }
  if (res.status === 400) {
    return (await res.json()).message as string;
  }
  return password;
}

export default changeUserPassword;
