module.exports = function attachTimestamp(req, res, next) {
  req.timestamp = new Date();
  next();
} 