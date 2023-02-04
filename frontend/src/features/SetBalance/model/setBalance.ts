import { IUserAccess } from '../../Registration/lib/types';
import { setValueCallback } from '../lib/types';

const balanceInputProps = {
  label: 'Your balance',
  placeholder: '0',
  type: 'text',
  required: true,
};

function validateBalance(value: string) {
  const pattern = /^[-+]?[0-9]+$/;
  return pattern.test(value);
}

function setToken(token: string) {
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
}

function setId(id: string) {
  if (id) {
    localStorage.setItem('id', JSON.stringify(id));
  }
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return tokenString;
}

function handleValidationError(value: string, handleError: setValueCallback<boolean>) {
  const isValid = validateBalance(value);
  handleError(isValid);
}
function handleOnChange(
  value: string,
  updateValueCallback: setValueCallback<string>,
  handleError: setValueCallback<boolean>,
) {
  updateValueCallback(value);
  handleValidationError(value, handleError);
}

function handleSubmitBalance(
  e: React.FormEvent<HTMLFormElement>,
  accessData: IUserAccess, approveUser: setValueCallback<boolean>,
  isValid: boolean) {
  e.preventDefault();
  if(isValid) {
    const { token, _id } = accessData;
    setToken(token);
    setId(_id);
    approveUser(true)
  }
}

export {
  validateBalance,
  balanceInputProps,
  handleSubmitBalance,
  handleValidationError,
  handleOnChange,
};
