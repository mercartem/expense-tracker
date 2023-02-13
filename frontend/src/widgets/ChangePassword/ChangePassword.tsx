import React from 'react';
import { Button, InputBase } from '@mui/material';
import style from './ChangePassword.module.scss';

function ChangePassword() {
  return (
    <div className={style.settings__password}>
      <InputBase
        className={style.password__input}
        type='password'
        placeholder='password'
      />
      <InputBase
        className={style.password__input}
        type='password'
        placeholder='repeat password'
      />
      <Button variant='contained' sx={{ fontSize: 12, padding: 1, width: 100 }}>
        Confirm
      </Button>
    </div>
  );
}

export default ChangePassword;
