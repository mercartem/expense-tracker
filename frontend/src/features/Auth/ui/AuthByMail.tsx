import { useTranslation } from 'react-i18next';
import { FormControl } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../../app/context/AuthContext';
import { Auth } from '../../../entities/User/lib/types/user';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/Textinput';
import { IUserAccess } from '../../../shared/lib/types';
import {
  mailInputProps,
  passwordInputProps,
  handleSubmit,
  validateUserInput,
} from '../model/authByMail';
import { isValidForm } from '../utils/utils';
import style from './AuthByMail.module.scss';

function AuthByMail() {
  const { t } = useTranslation();
  const [inputData, setInputData] = useState<Auth>({ email: '', password: '' });
  const [userAccessData, setUserAccessData] = useState<IUserAccess | null>(null);
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [inputErrors, setInputErrors] = useState({
    email: true,
    password: true,
  });
  const { setIsAuth } = useContext(AuthContext);

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    setInputData({ ...inputData, [name]: e.target.value });
    validateUserInput(name, e.target.value, inputErrors, setInputErrors);
    setFormValid(isValidForm({ ...inputData, [name]: e.target.value }));
  }

  function handleInputError(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    validateUserInput(name, e.target.value, inputErrors, setInputErrors);
  }

  return userAccessData ? (
    <Navigate to='/dashboard' replace />
  ) : (
    <div>
      {loginError && <p className={style.error}>{loginError}</p>}
      <form
        name='loginForm'
        className={style.form}
        noValidate
        onSubmit={async (e) => {
          await handleSubmit(e, inputData, setLoginError, setUserAccessData, setIsAuth);
          setInputData({ email: '', password: '' });
        }}
      >
        <FormControl>
          <TextInput
            {...mailInputProps}
            label = {t('email.emailLabel')}
            placeholder= {`${t('email.emailHolder')}`}
            value={inputData.email}
            onChange={(e) => handleOnchange(e, 'email')}
            helperText={inputErrors.email ? '' : `${t('email.emailError')}`}
            error={!inputErrors.email}
            onBlur={(e) => {
              handleInputError(e, 'email');
            }}
          />
        </FormControl>
        <FormControl>
          <TextInput
            {...passwordInputProps}
            label = {t('password.passLabel')}
            placeholder= {`${t('password.passHolder')}`}
            value={inputData.password}
            onChange={(e) => handleOnchange(e, 'password')}
            helperText={inputErrors.password ? '' : `${t('password.passError')}`}
            error={!inputErrors.password}
            onBlur={(e) => {
              handleInputError(e, 'password');
            }}
          />
        </FormControl>
        <ButtonRound text={t('button.login')} disabled={!formValid} isActive />
        <p className={style.formText}>
          {t('login.question')} <Link to='/sign'>{t('login.register')}</Link>
        </p>
      </form>
    </div>
  );
}

export default AuthByMail;
