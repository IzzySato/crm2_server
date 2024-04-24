const express = require('express');
const dotenv = require('dotenv');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const addressRouter = require('./routes/address.js');
const { dbConnect } = require('./database/db_config.js');
const logger = require('./lib/logger.js');

require('./lib/cache.js');

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

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

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
