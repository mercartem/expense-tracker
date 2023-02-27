import { createContext } from 'react';
import getAvatarUser from '../../entities/User/api/getAvatarUser';
import { getId } from '../../shared/utils/utils';

export interface AvatarContextProps {
  imageUrl: string;
  updateAvatar: () => Promise<void>;
  avatarUpdateCount: number;
}

export const AvatarContext = createContext<AvatarContextProps>({
  imageUrl: '',
  async updateAvatar() {
    const userId = getId() as string;
    const url = await getAvatarUser(userId);
  },
  avatarUpdateCount: 0,
});
