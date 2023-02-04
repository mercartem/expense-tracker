import { Navigate } from 'react-router-dom';
import loginUser from '../../../entities/User/api/loginUser';
import { User } from '../../../entities/User/lib/types/user';
import { ITextInputProps } from '../../../shared/ui/Textinput/TextInput';
import { IErrorFormCallback, ISetFormCallback } from '../lib/types';
import { setToken, validateMail, validatePassword } from '../utils/utils';

const mailInputProps: ITextInputProps = {
  label: 'Email',
  name: 'email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
  error: false,
};

const passwordInputProps: ITextInputProps = {
  label: 'Password',
  name: 'password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
  error: false,
  helperText: '',
};

function validateUserInput(
  name: string,
  value: string,
  data: { isValidMail: boolean; isValidPass: boolean },
  cb: ISetFormCallback,
) {
  if (name === 'email') {
    const validatedMail = validateMail(value).isValidMail;
    cb({ ...data, isValidMail: validatedMail });
  }
  if (name === 'password') {
    const validatedPass = validatePassword(value).isValidPass;
    cb({ ...data, isValidPass: validatedPass });
  }
}

// async function getUserData(loginData: User) {
//   try {
//     const userData = await loginUser(loginData);
//     // const token = userData;
//     // setToken(token)
//   }
//   catch(error) {
//     console.log(error)
//   }
// }

function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userData: User,
  cb: IErrorFormCallback,
  error: boolean,
) {
  // const {token} = response
  e.preventDefault();
  // if(userData) {
  //   setToken(userData.token)
  // }
  cb(!error);
  console.log(userData);
}

export { mailInputProps, passwordInputProps, handleSubmit, validateUserInput };
