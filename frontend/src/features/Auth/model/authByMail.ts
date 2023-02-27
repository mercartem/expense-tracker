import loginUser from '../../../entities/User/api/loginUser';
import { Auth } from '../../../entities/User/lib/types/user';
import { ITextInputProps } from '../../../shared/ui/Textinput/Textinput';
import {
  setId,
  setToken,
  setName,
  validateMail,
  validatePassword,
} from '../../../shared/utils/utils';
import { ICallback, IUserAccess } from '../../../shared/lib/types';

const mailInputProps: ITextInputProps = {
  label: 'Email',
  name: 'email',
  placeholder: 'Enter your Email',
  type: 'email',
  required: true,
};

const passwordInputProps: ITextInputProps = {
  label: 'Password',
  name: 'password',
  placeholder: 'Enter your password',
  type: 'password',
  required: true,
};

function validateUserInput(
  name: string,
  value: string,
  data: { email: boolean; password: boolean },
  updateFormValidation: ICallback<{ email: boolean; password: boolean }>,
) {
  if (name === 'email') {
    updateFormValidation({ ...data, [name]: validateMail(value) });
  } else {
    updateFormValidation({ ...data, [name]: validatePassword(value) });
  }
}

async function getUserData(loginData: Auth) {
  const response = await loginUser(loginData);
  if (typeof response === 'string') {
    throw new Error(response);
  } else {
    const { _id: id, token, fullName } = response;
    return { id, token, fullName };
  }
}
const errorMessages = ['User not found', 'Incorrect login or password', 'failed to login']

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  userData: Auth,
  errorHandler: ICallback<string>,
  setUserData: ICallback<IUserAccess>,
  updateContext: ICallback<boolean>,
) {
  e.preventDefault();
  try {
    const { id, token, fullName } = await getUserData(userData);
    if (id && token) {
      errorHandler('');
      setUserData({ id, token });
      setToken(token);
      setId(id);
      setName(fullName);
      updateContext(true);
    }
  } catch (err) {
    if (err instanceof Error) {
      const msg = err.message;
      const loginErrorInd = errorMessages.findIndex((item) => item.includes(msg))
      errorHandler(`loginError.${loginErrorInd}`);
    }
  }
}

export { mailInputProps, passwordInputProps, handleSubmit, validateUserInput };
