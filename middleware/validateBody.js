module.exports = function validateBody(keys) {
  return function (req, res, next) {
    if (!req.body) {
      const err = new Error('Bad Request: missing body');
      err.status = 400;
      return next(err);
    }
    for (const key of keys) {
      if (!(key in req.body)) {
        const err = new Error(`Bad Request: missing key '${key}'`);
        err.status = 400;
        return next(err);
      }
    }
    next();
  };
} 