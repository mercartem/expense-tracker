import { SelectChangeEvent } from '@mui/material';

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

export type CategoriesTyped = {
  [x: string]: string[];
};

export interface ISelectCategoryProps {
  updateState: (e: SelectChangeEvent) => void;
  error?: boolean;
  type: string;
  initialValue: string;
}

export interface ICheckboxProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  updateState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
