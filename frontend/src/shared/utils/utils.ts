function setToken(token: string) {
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
}

function getToken(): string | null {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  return tokenString;
}

function tokenExist() {
  if (getToken()) {
    return true;
  }
  return false;
}

function setId(id: string) {
  if (id) {
    localStorage.setItem('id', JSON.stringify(id));
  }
}

function getId(): string | null {
  const idString = localStorage.getItem('id');
  if (idString) {
    return JSON.parse(idString);
  }
  return idString;
}

function setName(name: string) {
  if (name) {
    localStorage.setItem('name', JSON.stringify(name));
  }
}

function getName() {
  const name = localStorage.getItem('name');
  if (name) {
    return JSON.parse(name);
  }
  return name;
}

function removeUserFromStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
}

function validateMail(mail: string) {
  const regexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regexp.test(mail);
}

function validatePassword(password: string) {
  return password.length > 4;
}

function validateName(name: string) {
  return name.length >= 4;
}

function validateBalance(value: string) {
  const pattern = /[+-]?([0-9]*[.])?[0-9]+/;
  return pattern.test(value.trim());
}

export {
  setToken,
  getToken,
  setId,
  getId,
  setName,
  getName,
  removeUserFromStorage,
  validateName,
  validatePassword,
  validateMail,
  validateBalance,
  tokenExist,
};
