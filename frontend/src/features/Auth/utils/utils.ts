function validateMail(mail: string) {
  const validMail = {isValidMail: false, helperTextMail: '' }
  const regexp  = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  if (regexp.test(mail)) {
    validMail.isValidMail = true;
  } else {
    validMail.helperTextMail = 'Enter a valid Email'
  }
  return validMail
}

function validatePassword(password: string) {
  const validPassword = {isValidPass: false, helperTextPass: '' }
  if (password.length > 5) {
    validPassword.isValidPass = true;
  }
   else {
    validPassword.helperTextPass = 'Password should be longer than 5 letters'
   }
  return validPassword
}

function isValidForm(validatedData:{ isValidMail: boolean, isValidPass: boolean}) {
  return validatedData.isValidMail&&validatedData.isValidPass
  }

  export { isValidForm, validateMail, validatePassword }