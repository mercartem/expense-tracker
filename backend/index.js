import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {
  registerValidation,
  loginValidation,
  transactionCreateValidation,
} from './validations.js';
import { UserController, TransactionController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.rgvqzgq.mongodb.net/tracker?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((error) => console.log('DB Error', error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/transactions', TransactionController.getAll);
app.post(
  '/transactions',
  checkAuth,
  transactionCreateValidation,
  handleValidationErrors,
  TransactionController.create
);
app.delete('/transactions/:id', checkAuth, TransactionController.remove);
app.patch(
  '/transactions/:id',
  checkAuth,
  transactionCreateValidation,
  handleValidationErrors,
  TransactionController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server OK');
});
