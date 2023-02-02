import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import {
  countBalance,
  countBalanceReverse,
} from '../utils/balance/countCurrentBalance.js';
import { increaseBalance } from '../utils/balance/increaseBalance.js';
import { decreaseBalance } from '../utils/balance/decreaseBalance.js';

const transaction = (req) => {
  return {
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount,
    paymentMode: req.body.paymentMode,
    transactionType: req.body.transactionType,
    date: req.body.date,
    time: req.body.time,
    user: req.userId,
  };
};

const create = async (req, res) => {
  try {
    const doc = new Transaction(transaction(req));
    const addTransaction = await doc.save();

    countBalance(req.body, req.userId);

    res.json(addTransaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create Transaction',
      error: err,
    });
  }
};

const update = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const oldTransaction = await Transaction.findById(transactionId);

    await Transaction.updateOne(
      {
        _id: transactionId,
      },
      transaction(req)
    ).then(() => {
      Transaction.findOne(
        {
          _id: transactionId,
        },
        async (err, doc) => {
          if (oldTransaction.transactionType === 'income') {
            decreaseBalance(oldTransaction, req.userId);
          }
          if (oldTransaction.transactionType === 'outcome') {
            increaseBalance(oldTransaction, req.userId);
          }
          countBalance(doc, req.userId, oldTransaction.amount);
        }
      );
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update transaction',
    });
  }
};

const getAll = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get transactions',
    });
  }
};

const getOne = async (req, res) => {
  try {
    const transactionId = req.params.id;

    Transaction.findOne(
      {
        _id: transactionId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Failed to get transaction',
          });
        }

        if (!doc) {
          res.status(400).json({
            message: 'Transaction not found',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get transaction',
    });
  }
};

const getMy = async (req, res) => {
  try {
    const userId = req.params.id;

    Transaction.find(
      {
        user: userId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Failed to get my transactions',
          });
        }

        if (!doc) {
          res.status(404).json({
            message: 'Transaction not found',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get my transactions',
    });
  }
};

const remove = async (req, res) => {
  try {
    const transactionId = req.params.id;

    Transaction.findOneAndDelete(
      {
        _id: transactionId,
      },
      async (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Failed to remove my transaction',
          });
        }

        await countBalanceReverse(doc, req.userId);

        if (!doc) {
          notFoundError(doc, 'Transaction not found');
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get transaction',
    });
  }
};

export { create, getAll, remove, update, getOne, getMy };
