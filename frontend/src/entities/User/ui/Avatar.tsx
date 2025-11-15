import { useContext } from 'react';
import { AvatarContext } from '../../../app/context/AvatarContext';

function UserAvatar() {
  const { imageUrl, avatarUpdateCount } = useContext(AvatarContext);

  return (
    <img
      src={imageUrl}
      width='120px'
      height='120px'
      alt='Avatar'
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      key={avatarUpdateCount}
    />
  );
}

export default UserAvatar;
