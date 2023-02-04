import { Navigate } from 'react-router-dom';
import loginUser from '../../../entities/User/api/loginUser';
import registerUser from '../../../entities/User/api/registerUser';
import { User } from '../../../entities/User/lib/types/user';
import { ITextInputProps } from '../../../shared/ui/Textinput/TextInput';
import {
  DataToValidate,
  IErrorFormCallback,
  IRegisterError,
  ISetFormCallback,
  IUpdateCallback,
} from '../lib/types';
import { validateMail, validateName, validatePassword } from '../utils/utils';

const mailInputProps: ITextInputProps = {
  label: 'Email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
};

const passwordInputProps: ITextInputProps = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
};

const nameInputProps: ITextInputProps = {
  label: 'Name',
  placeholder: 'Enter your name',
  type: 'text',
  required: true,
};

function validateUserInput(
  name: string,
  value: string,
  data: DataToValidate,
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
  if (name === 'fullName') {
    const validatedName = validateName(value).isValidName;
    cb({ ...data, isValidName: validatedName });
  }
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userData: User,
  updateUserCallback: IUpdateCallback,
  errorCallback: IErrorFormCallback,
) {
  e.preventDefault();
  try {
    const response = await registerUser(userData);
    console.log(response);
    const { _id, token } = response;
    updateUserCallback({ ...userData, _id, token });
  } catch (err) {
    console.log(err);
    errorCallback(false);
  }
}

export { mailInputProps, passwordInputProps, nameInputProps, handleSubmit, validateUserInput };
