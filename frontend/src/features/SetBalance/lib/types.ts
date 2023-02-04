export interface updateBalanceCb {
  (value: string): void;
}

export interface setValueCallback<T> {
  (value: T): void;
}
