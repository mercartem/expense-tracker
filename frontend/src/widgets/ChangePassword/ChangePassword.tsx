import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, InputBase } from '@mui/material';
import style from './ChangePassword.module.scss';

function ChangePassword() {
  const { t } = useTranslation();
  return (
    <div className={style.settings__password}>
      <InputBase
        className={style.password__input}
        type='password'
        placeholder= {`${t('passLabel')}`}
      />
      <InputBase
        className={style.password__input}
        type='password'
        placeholder={`${t('passLabelRepeat')}`}
      />
      <Button variant='contained' sx={{ fontSize: 12, padding: 1, width: 100 }}>
        {t('button.confirm')}
      </Button>
    </div>
  );
}

export default ChangePassword;
