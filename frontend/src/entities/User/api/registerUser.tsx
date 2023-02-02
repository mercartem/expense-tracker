import server from '../../../shared/constants/url';
import { User } from '../lib/types/user';

async function registerUser(user: User): Promise<Response> {
  const res = await fetch(`${server}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const result = await res.json();
  return result;
}

export default registerUser;
