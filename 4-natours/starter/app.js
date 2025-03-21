const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRouters');
const userRouter = require('./routers/userRouters');

const app = express();

// ====================================== Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`)); // http://localhost:3000/overview.html

app.use((req, res, next) => {
  // console.log('=========================================');
  // console.log('Hello from Middleware');
  // console.log('=========================================');

  next();
}); // Middleware, should be defined before app.route to be called by route middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// ====================================== Route handlers

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
