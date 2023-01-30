import { body } from 'express-validator';

const loginValidation = [
  body('email', 'Icorrect email format').isEmail(),
  body('password', 'Password should not be less than 5 symbols').isLength({
    min: 5,
  }),
];

const registerValidation = [
  body('email', 'Icorrect email format').isEmail(),
  body('password', 'Password should not be less than 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'Set your name').isLength({ min: 3 }),
];

const transactionCreateValidation = [
  body('category', 'Enter post category').isLength({ min: 3 }).isString(),
  body('text', 'Enter post text').isLength({ min: 5 }).isString(),
  body('tags', 'Incorrect image url').optional().isArray(),
];

export { registerValidation, loginValidation, transactionCreateValidation };
