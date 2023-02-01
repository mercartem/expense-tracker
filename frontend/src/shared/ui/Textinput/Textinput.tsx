import TextField from '@mui/material/TextField';

export interface ITextinputprops {
  label: string;
  placeholder?: string | '';
  type: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Textinput(props: ITextinputprops) {
  const {placeholder, label, type, onChange, required} = props;
  return (
  <TextField
    placeholder={placeholder}
    label={label}
    type={type}
    onChange={onChange}
    required={false}
  />
)}

export default Textinput