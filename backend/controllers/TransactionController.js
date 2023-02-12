import Transaction from '../models/Transaction.js';
import {
  countBalance,
  countBalanceReverse,
} from '../utils/balance/countCurrentBalance.js';
import { convertToDate } from '../utils/index.js';
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
    );

    Transaction.findOne(
      {
        _id: transactionId,
      },
      (err, doc) => {
        if (oldTransaction.transactionType === 'income') {
          decreaseBalance(oldTransaction, req.userId);
        }
        if (oldTransaction.transactionType === 'expense') {
          increaseBalance(oldTransaction, req.userId);
        }
        countBalance(doc, req.userId);
      }
    );

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
          return res.status(500).json({
            message: 'Failed to get transaction',
          });
        }

        if (!doc) {
          return res.status(400).json({
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
    let { page, limit, ...args } = req.query;
    let keys = Object.keys(args);

    page -= 1;

    Transaction.find(
      {
        user: req.userId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Failed to get my transactions',
          });
        }

        let filtered = [...doc];

        // Фильтр по диапазону дат
        if ('from' in req.query) {
          filtered = filtered.filter((item) => {
            if (args.from <= item.date && item.date <= args.to) {
              return item;
            }
          });

          keys.splice(keys.indexOf('from'), 1);
          keys.splice(keys.indexOf('to'), 1);
        }

        // Поиск по элементам
        if ('search' in req.query) {
          const search = req.query.search;
          filtered = filtered.filter(
            ({
              category,
              description,
              amount,
              paymentMode,
              transactionType,
            }) => {
              return (
                category.includes(search) ||
                description.includes(search) ||
                amount.toString().includes(search) ||
                paymentMode.includes(search) ||
                transactionType.includes(search)
              );
            }
          );

          keys.splice(keys.indexOf('search'), 1);
        }

        // Фильтр по остальным параметрам
        keys.map((arg) => {
          filtered = filtered.filter((item) => {
            return item[arg] === args[arg];
          });
        });

        // Сортировка по дате отфильтрованных транзакций
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        });

        if (limit === '0') {
          return res.json(filtered);
        }

        res.json(filtered.slice(limit * page, limit * (page + 1)));
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
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Failed to remove my transaction',
          });
        }

        countBalanceReverse(doc, req.userId);

        if (!doc) {
          return res.status(500).json({
            message: 'Transaction not found',
          });
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
