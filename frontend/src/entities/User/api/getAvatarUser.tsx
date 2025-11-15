import server from '../../../shared/constants/url';
import moneyImg from '../../../shared/assets/money.svg';

async function getAvatarUser(id: string) {
  const url = `${server}/upload/${id}`;

  try {
    const response = await fetch(url);

    if (response.status === 200) {
      return url;
    }
    throw new Error('Failed to fetch image from server');
  } catch (error) {
    console.error(error);
    return moneyImg;
  }
}

export default getAvatarUser;
