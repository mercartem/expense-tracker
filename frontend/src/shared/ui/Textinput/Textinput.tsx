import { TextField } from '@mui/material';
import { MutableRefObject, FocusEvent } from 'react';

export interface ITextInputProps {
  label: string;
  name?: string;
  value?: string;
  placeholder?: string | '';
  type: string;
  required?: boolean;
  error?: boolean;
  ref?: MutableRefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

function TextInput(props: ITextInputProps) {
  return <TextField {...props} />;
}

export default TextInput;
