export default (message) => {
  res.status(500).json({
    message: message,
  });
}