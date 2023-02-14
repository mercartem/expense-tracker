import { useTranslation } from 'react-i18next';
import { FormControl } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../../entities/User/lib/types/user';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/Textinput';
import isValidForm from '../utils/utils';
import {
  handleSubmit,
  mailInputProps,
  nameInputProps,
  passwordInputProps,
  validateUserInput,
} from '../model/registerByMail';

import style from './RegisterByMail.module.scss';
import { IUserAccess } from '../lib/types';
import SetBalance from '../../SetBalance/ui/SetBalance';

function RegisterByMail() {
  const { t } = useTranslation();
  const [inputData, setInputData] = useState<Required<Auth>>({
    email: '',
    password: '',
    fullName: '',
  });
  const [userAccessData, setUserAccessData] = useState<IUserAccess | null>(null);
  const [formValid, setFormValid] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [inputErrors, setInputErrors] = useState({
    email: true,
    password: true,
    fullName: true,
  });

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    setInputData({ ...inputData, [name]: e.target.value });
    validateUserInput(name, e.target.value, inputErrors, setInputErrors);
    setFormValid(isValidForm({ ...inputData, [name]: e.target.value }));
  }

  function handleInputError(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    validateUserInput(name, e.target.value, inputErrors, setInputErrors);
  }
  return (
    <div>
      {userAccessData ? (
        <SetBalance {...userAccessData} />
      ) : (
        <>
          <h2 className={style.title}>{t('register.title')}</h2>
          <form
            name='registerForm'
            className={style.form}
            noValidate
            onSubmit={async (e) => {
              await handleSubmit(e, inputData, setUserAccessData, setRegisterError);
              setInputData({ email: '', password: '', fullName: '' });
            }}
          >
            {registerError && <p className={style.error}>{registerError}</p>}
            <FormControl>
              <TextInput
                {...nameInputProps}
                label = {t('name.nameLabel')}
                placeholder= {`${t('name.nameHolder')}`}
                value={inputData.fullName}
                onChange={(e) => handleOnchange(e, 'fullName')}
                helperText={inputErrors.fullName ? '' :  `${t('name.nameError')}`}
                error={!inputErrors.fullName}
                onBlur={(e) => {
                  handleInputError(e, 'fullName');
                }}
              />
            </FormControl>
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
            <ButtonRound text={t('button.sign')} disabled={!formValid} isActive />
            <p className={style.formText}>
            {t('register.question')} <Link to='/login'>{t('register.login')}</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default RegisterByMail;
