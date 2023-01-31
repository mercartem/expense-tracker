import { Schema, model } from 'mongoose';

const Transaction = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: false
    },
    description: {
      type: String,
      required: true,
      unique: false
    },
    amount: {
      type: Number,
      required: true,
      unique: false
    },
    paymentMode: {
      type: String,
      required: true,
      unique: false
    },
    transactionType: {
      type: String,
      required: true,
      unique: false
    },
    date: {
      type: String,
      required: true,
      unique: false
    },
    time: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

export default model('Transaction', Transaction);
