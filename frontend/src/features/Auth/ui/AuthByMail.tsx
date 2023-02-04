import { FormControl } from '@mui/material';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../../entities/User/lib/types/user';
import ButtonRound from '../../../shared/ui/ButtonRound/ButtonRound';
import TextInput from '../../../shared/ui/Textinput/TextInput';
import {
  mailInputProps,
  passwordInputProps,
  handleSubmit,
  validateUserInput,
} from '../model/authByMail';
import { isValidForm } from '../utils/utils';
import style from './AuthByMail.module.scss';

function AuthByMail() {
  const [inputData, setInputData] = useState<User>({ email: '', password: '' });
  const [userData, setUserData] = useState<User | null>(null);
  const [formValid, setFormValid] = useState({ isValidMail: false, isValidPass: false });
  const [loginError, setLoginError] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    setInputData({ ...inputData, [name]: e.target.value });
    validateUserInput(name, e.target.value, formValid, setFormValid);
  }

  return (
    <div>
      {loginError && <p className={style.error}>The user is not found. Check your data!</p>}
      {userData && <Navigate to='/dashboard' replace />}
      <form
        name='loginform'
        className={style.form}
        noValidate
        onSubmit={(e) => {
          handleSubmit(e, inputData, setLoginError, loginError);
          setUserData({ email: '', password: '' });
        }}
      >
        <FormControl>
          <TextInput
            {...mailInputProps}
            value={inputData.email}
            onChange={(e) => handleOnchange(e, 'email')}
            helperText={formValid.isValidMail ? '' : 'Enter a valid Email'}
            error={errorMail}
            onBlur={(e) => {
              if (formValid.isValidMail) {
                setErrorMail(false);
              } else setErrorMail(true);
            }}
          />
        </FormControl>
        <FormControl>
          <TextInput
            {...passwordInputProps}
            value={inputData.password}
            onChange={(e) => handleOnchange(e, 'password')}
            helperText={formValid.isValidPass ? '' : 'Password should be longer than 5 letters'}
            error={errorPassword}
            onBlur={(e) => {
              if (formValid.isValidPass) {
                setErrorPassword(false);
              } else setErrorPassword(true);
            }}
          />
        </FormControl>
        <ButtonRound type='submit' text='Login' disabled={!isValidForm(formValid)} isActive />
        <p className={style.formtext}>Forgot your password?</p>
        <p className={style.formtext}>
          Do not have an account? <Link to='/sign'>Register</Link>
        </p>
      </form>
    </div>
  );
}

export default AuthByMail;
