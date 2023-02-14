import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import style from './ChangePassword.module.scss';
import { getToken } from '../../shared/utils/utils';
import changeUserPassword from '../../entities/User/api/changeUserPassword';

function ChangePassword() {
  const passwordText = useRef<HTMLInputElement>(null);
  const passwordRepeatText = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const showInput = () => {
    const password = passwordText.current?.value;
    const repeat = passwordRepeatText.current?.value;

    if (password === repeat) {
      const token = getToken();
      const newPassword = {
        password
      };
      if (token && newPassword) {
        try {
          const response = changeUserPassword(newPassword, token);
          setMessage('Пароль успешно изменен');
          if (typeof response === 'string') {
            throw new Error(response);
          }
          return response;
        } catch (error) {
          if (error instanceof Error) return error.message;
        }
      }
      return newPassword;
    }
    return setMessage('Пароли не совпадают');
  };

  return (
    <div className={style.settings__password}>
      <div className={style.password__container}>
        <div className={style.password__inputs}>
          <input
            className={style.password__input}
            type='password'
            placeholder='password'
            ref={passwordText}
          />
          <input
            className={style.password__input}
            type='password'
            placeholder='repeat password'
            ref={passwordRepeatText}
          />
        </div>
        <p className={style.password__message}>{message}</p>
      </div>
      <Button onClick={showInput} variant='contained' sx={{ fontSize: 12, padding: 1, width: 100 }}>
        Confirm
      </Button>
    </div>
  );
}

export default ChangePassword;
