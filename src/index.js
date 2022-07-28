const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const createHttpError = require('http-errors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const expressPino = require('./middlewares/logger/Logger');
const cookieMdl = require('./middlewares/cookie-session/Cookie-session');

// * express server
// load movies routes
const movies = require('./routes/movies.routes');

// using logger to handle error
const { logger } = expressPino;

// set host and port
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

// use express middleware body-parser and cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CORS || '*',
}));

// set server cookie
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY], // get cookie key in env file
  // Cookie Options
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // set to 24 hours
}));

// useing express pino middleware
app.use(expressPino);

// load movies router
app.use('/movies', cookieMdl, movies);

//* Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(404));
});

//* Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // eslint-disable-next-line max-len
  const { statusCode } = res.status(err.status || 500); // if status code not defined it will set 500
  if (statusCode === 500) {
    logger.error(err.message);
    res.json({
      status: 'error',
      message: 'internal server error',
    });
  }
  res.json({
    status: 'fail',
    message: err.message,
  });
});

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Environtment ${process.env.NODE_ENV} | Server listen to PORT ${port}`);
});
