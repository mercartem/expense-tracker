import { FormControl } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../entities/User/lib/types/user';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/TextInput';
import { isValidForm } from '../utils/utils';
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
  const [inputData, setInputData] = useState<User>({ email: '', password: '', fullName: '' });
  const [userData, setUserData] = useState<IUserAccess | null>(null);
  const [formValid, setFormValid] = useState({
    isValidMail: false,
    isValidPass: false,
    isValidName: false,
  });
  const [registerError, setRegisterError] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
    fullName: false,
  });

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    setInputData({ ...inputData, [name]: e.target.value });
    validateUserInput(name, e.target.value, formValid, setFormValid);
  }

  function handleError(e: React.ChangeEvent<HTMLInputElement>, name: string, isValid: boolean) {
    setInputErrors({ ...inputErrors, [name]: isValid });
  }
  return (
    <div>
      {userData ? (
        <SetBalance {...userData} />
      ) : (
        <>
          <h2 className={style.title}>Enter your data to register</h2>
          <form
            name='registerform'
            className={style.form}
            onSubmit={async (e) => {
              await handleSubmit(e, inputData, setUserData, setRegisterError);
              setInputData({ email: '', password: '', fullName: '' });
            }}
          >
            {registerError && <p className={style.error}>The user can not be created!</p>}
            <FormControl>
              <TextInput
                {...nameInputProps}
                value={inputData.fullName}
                onChange={(e) => handleOnchange(e, 'fullName')}
                helperText={formValid.isValidName ? '' : 'Name should be more than 4 symbols'}
                error={inputErrors.fullName}
                onBlur={(e) => {
                  handleError(e, 'fullName', !formValid.isValidName);
                }}
              />
            </FormControl>
            <FormControl>
              <TextInput
                {...mailInputProps}
                value={inputData.email}
                onChange={(e) => handleOnchange(e, 'email')}
                helperText={formValid.isValidMail ? '' : 'Enter a valid Email'}
                error={inputErrors.email}
                onBlur={(e) => {
                  handleError(e, 'email', !formValid.isValidName);
                }}
              />
            </FormControl>
            <FormControl>
              <TextInput
                {...passwordInputProps}
                value={inputData.password}
                onChange={(e) => handleOnchange(e, 'password')}
                helperText={formValid.isValidPass ? '' : 'Password should be longer than 5 letters'}
                error={inputErrors.password}
                onBlur={(e) => {
                  handleError(e, 'password', !formValid.isValidName);
                }}
              />
            </FormControl>
            <ButtonRound type='submit' text='Sign in' disabled={!isValidForm(formValid)} isActive />
            <p className={style.formtext}>
              Have an account? <Link to='/login'>Log in</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

export default RegisterByMail;
