import { Schema, model } from 'mongoose';

const Transaction = new Schema(
  {
    category: {
      type: String,
      unique: false
    },
    description: {
      type: String,
      unique: false
    },
    amount: {
      type: Number,
      unique: false
    },
    paymentMode: {
      type: String,
      unique: false
    },
    transactionType: {
      type: String,
      unique: false
    },
    date: {
      type: String,
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
