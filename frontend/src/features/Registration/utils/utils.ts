import { DataToValidate } from '../lib/types';

function validateMail(mail: string) {
  const validMail = { isValidMail: false };
  const regexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (regexp.test(mail)) {
    validMail.isValidMail = true;
  }
  return validMail;
}

function validatePassword(password: string) {
  const validPassword = { isValidPass: false };
  if (password.length > 4) {
    validPassword.isValidPass = true;
  }
  return validPassword;
}

function validateName(name: string) {
  const validName = { isValidName: false };
  if (name.length >= 4) {
    validName.isValidName = true;
  }
  return validName;
}

function isValidForm(validatedData: DataToValidate) {
  return validatedData.isValidMail && validatedData.isValidPass && validatedData.isValidName;
}

export { isValidForm, validateMail, validatePassword, validateName };
