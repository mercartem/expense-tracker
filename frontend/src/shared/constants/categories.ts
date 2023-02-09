import { CategoriesTyped } from '../lib/types';

const categories = [
  'Food',
  'Transportation',
  'Rent',
  'Bills',
  'Utilities',
  'Shopping',
  'Entertainment',
  'Health Care',
  'Housing',
  'Taxes',
  'Clothing',
  'Education',
  'Miscellaneous',
  'Personal Care',
  'Salary',
  'Interests',
  'Business',
  'Extra income',
];


const categoriesTyped: CategoriesTyped = {
  expense: [
    'Food',
    'Transportation',
    'Rent',
    'Bills',
    'Utilities',
    'Shopping',
    'Entertainment',
    'Health Care',
    'Housing',
    'Taxes',
    'Clothing',
    'Education',
    'Miscellaneous',
    'Personal Care',
  ],
  income: [
    'Salary',
    'Interests',
    'Business',
    'Extra income',
  ]
};

export { categories, categoriesTyped};
