import { Schema, model } from 'mongoose';

const User = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export default model('User', User);
