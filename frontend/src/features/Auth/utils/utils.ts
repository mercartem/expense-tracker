import { validateMail, validatePassword } from '../../../shared/utils/utils';

function isValidForm(data: { email: string; password: string }) {
  return validateMail(data.email) && validatePassword(data.password);
}

export { isValidForm, validatePassword };
