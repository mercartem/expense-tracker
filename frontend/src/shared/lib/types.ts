export interface IUserAccess {
  id: string;
  token: string;
}

export interface ICallback<T> {
  (param: T): void;
}

export interface NavbarProps {
  balance?: string;
}
