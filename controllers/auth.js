const User = require('../models/User');
const { AppError } = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return next(new AppError('Email already exists.', 400));
  }

  const user = await User.create({ name, email, password, role });

  const token = user.createJWT();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(201).json({ success: true, data: user, token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials.', 401));
  }

  const token = user.createJWT();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    success: true,
    token,
  });
});

// Log user out
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    msg: 'User logged out.',
  });
});
