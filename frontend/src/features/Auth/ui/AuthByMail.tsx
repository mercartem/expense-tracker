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
            value={inputData.email}
            onChange={(e) => handleOnchange(e, 'email')}
            helperText={inputErrors.email ? '' : 'Enter a valid Email'}
            error={!inputErrors.email}
            onBlur={(e) => {
              handleInputError(e, 'email');
            }}
          />
        </FormControl>
        <FormControl>
          <TextInput
            {...passwordInputProps}
            value={inputData.password}
            onChange={(e) => handleOnchange(e, 'password')}
            helperText={inputErrors.password ? '' : 'Password should be longer than 5 letters'}
            error={!inputErrors.password}
            onBlur={(e) => {
              handleInputError(e, 'password');
            }}
          />
        </FormControl>
        <ButtonRound text='Login' disabled={!formValid} isActive />
        <p className={style.formText}>Forgot your password?</p>
        <p className={style.formText}>
          Do not have an account? <Link to='/sign'>Register</Link>
        </p>
      </form>
    </div>
  );
}

export default AuthByMail;
