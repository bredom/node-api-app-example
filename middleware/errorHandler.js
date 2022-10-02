const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong. Try again.',
  };

  //Mongoose validation error
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map(val => val.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    customError.msg = 'Authentication failed.';
    customError.statusCode = 401;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg,
  });
};

module.exports = errorHandler;
