const { ENV } = require('../constants/env');
const { NOT_FOUND, INTERNAL_SERVER } = require('../constants/errorMessage');
const { STATUS } = require('../constants/status');

/**
 * production: we don't want to show all error message instead just show 404 NOT_FOUND
 * development: show full error message
 * @param err previous error message
 * @param req
 * @param res
 * @param next
 */
const errorHandling = (err, req, res, next) => {
  if (process.env.NODE_ENV !== ENV.PRODUCTION.NAME) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }
  if (err.statusCode.startWith(4)) {
    return res.status(404).json({ status: STATUS.ERROR, message: NOT_FOUND });
  }
  res.status(500).json({
    status: STATUS.ERROR,
    message: INTERNAL_SERVER,
  });
};

module.exports = {
  errorHandling,
};
