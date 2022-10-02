const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

const { AppError } = require('./utils/AppError');

require('./db/db');

//First install with npm
/* const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean'); 
const cookieParser = require('cookie-parser');
const cors = require('cors'); */

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Static folder
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '../client/build')));

//Test middleware
/* app.use((req, res, next) => {
  console.log(path.join(__dirname, '../client/build'));
  next();
}); */

// Routes
app.get('/', (req, res) => {
  res.json({ data: 'Example API' });
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tasks', require('./routes/tasks'));
app.use('/api/v1/products', require('./routes/products'));

//Handling wrong address
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Global Error Handler
app.use(errorHandler);

//Listening on server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
