import { ITextinputprops } from '../../../shared/ui/Textinput/Textinput';

const mailInputProps: ITextinputprops = {
  label: 'Email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value)},
}

const passwordInputProps: ITextinputprops = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value)},
}

export {mailInputProps, passwordInputProps}