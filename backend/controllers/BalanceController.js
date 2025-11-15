import User from '../models/User.js';

const setBalance = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          balance: +req.body.balance,
        },
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    return console.log(err);
  }
};

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const balance = user._doc.balance;
    if (!balance) {
      return res.status(404).json({
        message: 'Balance is not determined',
      });
    }

    res.json(balance);
  } catch (err) {
    return console.log(err);
  }
};

export { setBalance, getBalance }