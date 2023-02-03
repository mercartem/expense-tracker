import server from '../../../shared/constants/url';
import { Auth, User } from '../lib/types/user';

async function loginUser(user: Auth): Promise<User | string> {
  const res = await fetch(`${server}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (res.status === 403) {
    return (await res.json())[0].msg as string;
  }
  if (res.status === 404) {
    return (await res.json()).message as string;
  }
  return (await res.json()) as User;
}

export default loginUser;
