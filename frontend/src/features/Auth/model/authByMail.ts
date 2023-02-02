import { User } from '../../../entities/User/lib/types/user';
import  { ITextInputProps } from '../../../shared/ui/Textinput/TextInput';
import { ISetFormCallback } from '../lib/types';
import { validateMail, validatePassword } from '../utils/utils';

const mailInputProps: ITextInputProps = {
  label: 'Email',
  name: 'email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
  error: false,
}

const passwordInputProps: ITextInputProps = {
  label: 'Password',
  name: 'password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
  error: false,
  helperText: ''
}
function handleSubmit (e: React.FormEvent<HTMLFormElement>, userData: User) {
  e.preventDefault();
  console.log(userData)
}

function validateUserInput(
  name: string,
  value: string, 
  data: { isValidMail: boolean, isValidPass: boolean},
  cb:ISetFormCallback) {

  if (name === 'email') {
    const validatedMail = validateMail(value).isValidMail
    cb({...data, isValidMail: validatedMail})
  }
  if (name === 'password') {
    const validatedPass = validatePassword(value).isValidPass
    cb({...data, isValidPass: validatedPass})
  }
}

export {mailInputProps, passwordInputProps, handleSubmit, validateUserInput }