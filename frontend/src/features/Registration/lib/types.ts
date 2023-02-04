export interface IAuthFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type DataToValidate = {
  isValidMail: boolean;
  isValidPass: boolean;
  isValidName: boolean;
};
export interface ISetFormCallback {
  (data: DataToValidate): void;
}

export interface IErrorFormCallback {
  (error: boolean): void;
}

export interface IUserAccess {
  _id: string;
  token: string;
}
export interface IUpdateCallback {
  (user: IUserAccess): void;
}
export interface IRegisterError {
  msg: string;
  param: string;
}
