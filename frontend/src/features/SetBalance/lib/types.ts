export interface IUpdateBalanceCb {
  (value: string): void;
}

export interface ISetValueCallback<T> {
  (value: T): void;
}
