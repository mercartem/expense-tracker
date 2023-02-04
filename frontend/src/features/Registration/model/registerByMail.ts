import registerUser from '../../../entities/User/api/registerUser';
import { Auth } from '../../../entities/User/lib/types/user';
import {
  setId,
  setToken,
  validateMail,
  validateName,
  validatePassword,
} from '../../../shared/utils/utils';
import { IUserAccess, ICallback } from '../../../shared/lib/types';
import { ITextInputProps } from '../../../shared/ui/TextInput/Textinput';
import { IDataToValidate } from '../lib/types';

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
  data: IDataToValidate,
  updateFormValidation: ICallback<IDataToValidate>,
) {
  switch (name) {
    case 'email': {
      updateFormValidation({ ...data, [name]: validateMail(value) });
      break;
    }
    case 'password': {
      updateFormValidation({ ...data, [name]: validatePassword(value) });
      break;
    }
    case 'fullName': {
      updateFormValidation({ ...data, [name]: validateName(value) });
      break;
    }
    default:
      return data;
  }
  return data;
}

async function registerNewUser(userData: Required<Auth>) {
  const response = await registerUser(userData);
  if (typeof response === 'string') {
    throw new Error(response);
  } else {
    const { _id: id, token } = response;
    return { id, token };
  }
}

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userData: Required<Auth>,
  updateUserCallback: ICallback<IUserAccess>,
  errorHandler: ICallback<string>,
) {
  e.preventDefault();
  try {
    const { id, token } = await registerNewUser(userData);
    if (id && token) {
      errorHandler('');
      updateUserCallback({ id, token });
      setToken(token);
      setId(id);
    } else {
      throw new Error('Failed to register. Please try once again');
    }
  } catch (err) {
    if (err instanceof Error) {
      errorHandler(err.message);
    }
  }
}

export { mailInputProps, passwordInputProps, nameInputProps, handleSubmit, validateUserInput };
