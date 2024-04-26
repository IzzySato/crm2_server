const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const addressRouter = require('./routes/address.js');
const authRouter = require('./routes/auth.js');
const { dbConnect } = require('./database/db_config.js');
const logger = require('./lib/logger.js');
const passport = require('passport');
const cookieSession = require('cookie-session');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

require('./lib/cache.js');
require('./middlewares/passport.js');

app.use(cookieSession({
  name: 'session',
  keys: ['crm_v2_key'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '150mb',
    extended: true,
  })
);

// Database Connect
dbConnect();

app.use('/address', addressRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
