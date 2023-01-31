export default (item, message) => {
  if (!item) {
    return res.status(404).json({
      message: message,
    });
  }
}