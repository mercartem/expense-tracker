import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { ChangeEvent, useContext } from 'react';
import { AvatarContext } from '../../../app/context/AvatarContext';
import createAvatarUser from '../../../entities/User/api/createAvatarUser';
import { getId, getToken } from '../../../shared/utils/utils';

function AddAvatar() {
  const { t } = useTranslation();
  const { updateAvatar } = useContext(AvatarContext);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const token = getToken() as string;
    const userId = getId() as string;
    const file = event.target.files && event.target.files[0];
    if (file) {
      formData.append('image', file, `${userId}.jpg`);
      createAvatarUser(token, formData);
      updateAvatar();
    }
  };

  return (
    <div className='settings__avatar'>
      <Button
        variant='contained'
        sx={{ fontSize: 12, padding: 1, minWidth: 100 }}
        component='label'
      >
        {t('avatarTitle')}
        <input hidden accept='image/*' multiple type='file' onChange={handleFileSelect} />
      </Button>
    </div>
  );
}

export default AddAvatar;
