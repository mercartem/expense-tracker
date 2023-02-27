import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import style from './ChangePassword.module.scss';
import { getToken } from '../../shared/utils/utils';
import changeUserPassword from '../../entities/User/api/changeUserPassword';

function ChangePassword() {
  const { t } = useTranslation();
  const passwordText = useRef<HTMLInputElement>(null);
  const passwordRepeatText = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState({
    text: '',
    color: 'rgb(199, 199, 199)',
  });

  function editMessage(text: string, color: string) {
    const copy = {...message};
    copy.text = text;
    copy.color = color;
    setMessage(copy);
  }

  const confirmPassword = async () => {
    const password = passwordText.current?.value;
    const repeat = passwordRepeatText.current?.value;
    const errorMessages = ['Password should not be less than 5 symbols', 'Auth token error']
    
    if (password === repeat) {
      const token = getToken();
      const newPassword = {
        password,
      };
      if (token && newPassword) {
        try {
          const response = await changeUserPassword(newPassword, token);

          if (typeof response === 'string') {
            const passErrorInd = errorMessages.findIndex((item) => item.includes(response))
            editMessage(`${t(`passwordChange.error.${passErrorInd}`)}`, 'rgb(226, 48, 48)');
          } else {
            editMessage(`${t('passwordChange.successfulChanged')}`, 'rgb(44, 148, 44)');
          }
          return response;
        } catch (error) {
          if (error instanceof Error) return error.message;
        }
      }
      return newPassword;
    }
    return editMessage(`${t('passwordChange.different')}`, 'rgb(226, 48, 48)');
  };
  


  return (
    <div className={style.settings__password}>
      <div className={style.password__container}>
        <input
          className={style.password__input}
          type='password'
          placeholder= {`${t('passLabel')}`}
          style={{ border: `1px solid ${message.color}` }}
          ref={passwordText}
        />
        <input
          className={style.password__input}
          type='password'
          placeholder={`${t('passLabelRepeat')}`}
          style={{ border: `1px solid ${message.color}` }}
          ref={passwordRepeatText}
        />
        <p className={style.password__message} style={{ color: message.color }}>{message.text}</p>
      </div>
      <Button
        onClick={confirmPassword}
        variant='contained'
        sx={{ fontSize: 12, padding: 1, width: 100 }}
      >
        {t('button.confirm')}
      </Button>
    </div>
  );
}

export default ChangePassword;
