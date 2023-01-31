import server from '../../../shared/constants/url';
import { User } from '../lib/types/user';

async function loginUser(user: User): Promise<Response> {
  const res = await fetch(`${server}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res;
}

export default loginUser;
