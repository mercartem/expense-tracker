export interface IUserAccess {
  id: string;
  token: string;
}

export interface ICallback<T> {
  (param: T): void;
}
