import User from '../../models/User.js';

export const increaseBalance = async (item, id) => {
  await User.updateOne(
    {
      _id: id,
    },
    {
      $inc: {
        balance: item.amount,
      },
    }
  );
};
