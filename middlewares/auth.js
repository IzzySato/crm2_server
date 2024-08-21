const { verifyJwtToken } = require('../lib/jwt');

/**
 * Middleware function to authenticate JSON Web Tokens (JWT)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];
  const user  = verifyJwtToken(token);
  if (user?.err) {
    return res.sendStatus(403);
  }
  req.user = user;
  next();
};

module.exports = { authenticateJWT };