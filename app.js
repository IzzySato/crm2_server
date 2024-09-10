'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const addressRouter = require('./routes/address/index.js');
const authRouter = require('./routes/auth/index.js');
const customerRouter = require('./routes/customer/index.js');
const userRouter = require('./routes/user/index.js');
const productRouter = require('./routes/product/index.js');
const uploadRouter = require('./routes/upload/index.js');
const jwtRouter = require('./routes/jwt/index.js');
const jobRouter = require('./routes/job/index.js');
const { dbConnect } = require('./database/dbConfig.js');
const passport = require('passport');
const session = require('express-session');
const loadEnv = require('./config/env.js');
const { ENV } = require('./constants/env.js');
const { ROUTES } = require('./constants/routes.js');
const { errorHandling } = require('./middlewares/errorHandling.js');
const { ROUTE_NOT_FOUND, SESSION_STORE } = require('./constants/errorMessage.js');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

store.on('error', function(error) {
  console.error(SESSION_STORE, error);
});

loadEnv();

const app = express();

require('./lib/cache.js');

app.use(
  session({
    store,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === ENV.PRODUCTION.NAME,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./middlewares/passport.js');

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    process.env.CLIENT_URL ?? 'http://localhost:3000'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Authorization'
  );
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

app.use(ROUTES.ADDRESS.BASE, addressRouter);
app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.CUSTOMER.BASE, customerRouter);
app.use(ROUTES.USER.BASE, userRouter);
app.use(ROUTES.PRODUCT.BASE, productRouter);
app.use(ROUTES.JOB.BASE, jobRouter);
app.use(ROUTES.UPLOAD.BASE, uploadRouter);
app.use(ROUTES.JWT.BASE, jwtRouter);

app.use(errorHandling);

app.use((req, res, next) => {
  res.status(404).json({ message: ROUTE_NOT_FOUND });
});

module.exports = app;
