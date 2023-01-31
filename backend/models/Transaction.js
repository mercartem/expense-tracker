import { Schema, model } from 'mongoose';

const Transaction = new Schema(
  {
    category: String,
    description: String,
    amount: String,
    paymentMode: String,
    transactionType: String,
    date: String,
    time: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default model('Transaction', Transaction);
