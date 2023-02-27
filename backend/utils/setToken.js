import jwt from "jsonwebtoken";

export const setToken = (user) => jwt.sign(
  {
    _id: user._id,
  },
  'secret123',
  {
    expiresIn: '30d',
  }
);