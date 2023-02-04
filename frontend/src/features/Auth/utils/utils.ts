function validateMail(mail: string) {
  const validMail = { isValidMail: false, helperTextMail: '' };
  const regexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  if (regexp.test(mail)) {
    validMail.isValidMail = true;
  } else {
    validMail.helperTextMail = 'Enter a valid Email';
  }
  return validMail;
}

function validatePassword(password: string) {
  const validPassword = { isValidPass: false, helperTextPass: '' };
  if (password.length > 4) {
    validPassword.isValidPass = true;
  } else {
    validPassword.helperTextPass = 'Password should be longer than 5 letters';
  }
  return validPassword;
}

function isValidForm(validatedData: { isValidMail: boolean; isValidPass: boolean }) {
  return validatedData.isValidMail && validatedData.isValidPass;
}

function setToken(token: string) {
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return tokenString;
}

export { isValidForm, validateMail, validatePassword, setToken, getToken };
