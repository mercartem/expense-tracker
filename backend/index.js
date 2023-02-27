import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  registerValidation,
  loginValidation,
  transactionCreateValidation,
  changePasswordValidation,
} from "./validations.js";
import {
  UserController,
  TransactionController,
  BalanceController,
} from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.rgvqzgq.mongodb.net/tracker?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((error) => console.log("DB Error", error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.userId}.${file.originalname.split(".")[1]}`);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.patch(
  "/auth/me",
  checkAuth,
  changePasswordValidation,
  handleValidationErrors,
  UserController.changePassword
);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});
app.get("/upload/:userId", (req, res) => {
  const userId = req.params.userId;
  const imagePath = path.resolve("uploads", `${userId}.jpg`);

  // Проверяем, существует ли файл изображения
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.post("/balance/:id", checkAuth, BalanceController.setBalance);
app.get("/balance", checkAuth, BalanceController.getBalance);

app.get("/transactions", TransactionController.getAll);
app.get("/user/transactions", checkAuth, TransactionController.getMy);
app.get("/transactions/:id", checkAuth, TransactionController.getOne);
app.post(
  "/transactions",
  checkAuth,
  transactionCreateValidation,
  handleValidationErrors,
  TransactionController.create
);
app.delete("/transactions/:id", checkAuth, TransactionController.remove);
app.patch("/transactions/:id", checkAuth, TransactionController.update);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server OK");
});
