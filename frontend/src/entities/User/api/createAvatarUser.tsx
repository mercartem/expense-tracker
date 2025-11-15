import server from '../../../shared/constants/url';

async function createAvatarUser(token: string, formData: FormData): Promise<string> {
  try {
    const response = await fetch(`${server}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error('Error uploading avatar');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default createAvatarUser;
