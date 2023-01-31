import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const getAll = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user').exec();

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get transactions',
    });
  }
};

// const getOne = async (req, res) => {
//   try {
//     const transactionId = req.params.id;

//     Transaction.findOne(
//       {
//         _id: transactionId,
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: 'Failed to return Transaction',
//           });
//         }

//         if (!doc) {
//           return res.status(404).json({
//             message: 'Transaction not found',
//           });
//         }

//         res.json(doc);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: 'Failed to get Transactions',
//     });
//   }
// };

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
            message: 'Failed to remove Transaction',
          });
        }

        if (!doc) {
          return res.status(404).json({
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
      message: 'Failed to get Transactions',
    });
  }
};

const create = async (req, res) => {
  try {
    const doc = new Transaction({
      category: req.body.category,
      description: req.body.description,
      amount: req.body.amount,
      paymentMode: req.body.paymentMode,
      transactionType: req.body.transactionType,
      date: req.body.date,
      time: req.body.time,
      user: req.userId,
    });

    const addTransaction = await doc.save();

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

    await Transaction.updateOne(
      {
        _id: transactionId,
      },
      {
        category: req.body.category,
        text: req.body.text,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update Transaction',
    });
  }
};

export { create, getAll, remove, update };
