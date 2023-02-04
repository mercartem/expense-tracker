export interface IAuthFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ISetFormCallback {
  (data: { isValidMail: boolean; isValidPass: boolean }): void;
}

export interface IErrorFormCallback {
  (error: boolean): void;
}
