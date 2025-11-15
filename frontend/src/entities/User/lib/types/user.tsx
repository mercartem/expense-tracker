export interface Auth {
  email: string;
  fullName?: string;
  password: string;
}

export interface User {
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  token: string;
  _id: string;
  __v: number;
}
