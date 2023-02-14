import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button
} from '@mui/material';

function AddAvatar() {
  const { t } = useTranslation();
  return (
    <div className='settings__avatar'>
      <Button
          variant='contained'
          sx={{ fontSize: 12, padding: 1, minWidth: 100 }}
        >
          {t('avatarTitle')}
        </Button>
    </div>
  );
};

export default AddAvatar;
