import { ITextInputProps } from '../../../shared/ui/Textinput/TextInput';

const mailInputProps: ITextInputProps = {
  label: 'Email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
  error: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value)},
}

const passwordInputProps: ITextInputProps = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
  error: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value)},
}

export {mailInputProps, passwordInputProps}