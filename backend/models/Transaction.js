import { Schema, model } from 'mongoose';

const Transaction = new Schema(
  {
    category: String,
    description: String,
    amount: Number,
    paymentMode: String,
    transactionType: String,
    date: String,
    time: String,
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
