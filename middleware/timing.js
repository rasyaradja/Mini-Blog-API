module.exports = function timing(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Response time: ${duration}ms`);
  });
  next();
} 