import Transaction from '../models/Transaction.js';
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

        let searched = [...doc];

        function filterByRange(start, finish, sign) {
          if (start in args && finish in args) {
            searched = searched.filter((item) => {
              if (args[start] <= item[sign] && item[sign] <= args[finish]) {
                return item;
              }
            });

            keys.splice(keys.indexOf(start), 1);
            keys.splice(keys.indexOf(finish), 1);
          }
        }

        // Фильтр по диапазону дат
        filterByRange('from', 'to', 'date');

        // Фильтр по диапазону цен
        filterByRange('min', 'max', 'amount');

        // Поиск по элементам
        if ('search' in args) {
          const search = args.search;
          searched = searched.filter(
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

        // Создание нового массива
        let filteredAndSearched = [];

        if (keys.length === 0) {
          filteredAndSearched = [...searched];
        }

        // Фильтр по остальным параметрам
        keys.map((arg) => {
          const param = args[arg];

          if (Array.isArray(param)) {
            param.map((el) => {
              makeSetByFilter(el);
            });
          } else {
            makeSetByFilter(param);
          }

          function makeSetByFilter(filter) {
            const filtered = searched.filter((item) => {
              return item[arg] === filter;
            });

            filtered.map((item) => {
              filteredAndSearched.push(item);
            });
          }
        });

        // Убираем дубликаты
        filteredAndSearched = [...new Set(filteredAndSearched)];

        // Сортировка по дате отфильтрованных транзакций
        filteredAndSearched = filteredAndSearched.sort((a, b) => {
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

        // Без пагинации
        if (limit === '0') {
          return res.json(filteredAndSearched);
        }

        // С пагинацией
        res.json(filteredAndSearched.slice(limit * page, limit * (page + 1)));
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
