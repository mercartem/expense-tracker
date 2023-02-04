import { Auth } from '../../../entities/User/lib/types/user';

export interface IAuthFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ISetFormCallback {
  (data: Required<Auth>): void;
}

export interface IErrorFormCallback {
  (error: boolean): void;
}

export interface IUserAccess {
  id: string;
  token: string;
}
export interface IUpdateCallback {
  (user: IUserAccess): void;
}
export interface IRegisterError {
  msg: string;
  param: string;
}

export interface IDataToValidate {
  email: boolean;
  password: boolean;
  fullName: boolean;
}
