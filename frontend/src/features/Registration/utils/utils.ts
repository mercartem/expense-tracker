import { Auth } from '../../../entities/User/lib/types/user';
import { validateMail, validatePassword, validateName } from '../../../shared/utils/utils';

function isValidForm(data: Required<Auth>) {
  return validateMail(data.email) && validatePassword(data.password) && validateName(data.fullName);
}

export default isValidForm;
