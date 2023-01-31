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
  body('category', 'Category should be string').isString(),
  body('paymentMode', 'Payment mode should be string').isString(),
  body('date', 'Date mode should be string').isString(),
  body('amount', 'There should be amount').exists(),
  body('time', 'Time mode should be string').isString(),
  body('description')
    .isString()
    .withMessage('Description should be string')
    .isLength({ min: 3 })
    .withMessage('Description is too short'),
  body('transactionType')
    .isString()
    .withMessage('Description should be string')
    .isIn(['income', 'outcome'])
    .withMessage('Valid types of transaction: income/outcome'),
];

export {
  registerValidation,
  loginValidation,
  transactionCreateValidation,
};
