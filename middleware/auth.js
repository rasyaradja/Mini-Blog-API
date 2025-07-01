module.exports = function auth(requiredRole) {
  return function (req, res, next) {
    const userRole = req.header('x-user-role');
    if (userRole !== requiredRole) {
      const err = new Error('Forbidden: insufficient role');
      err.status = 403;
      return next(err);
    }
    next();
  };
} 