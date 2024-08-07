const logger = require('./logger');

const logActivity = (req, res, next) => {
  const log = {
    userName: req.user ? req.user.email : 'Guest',
    sessionId: req.cookies['connect.sid'],
    url: req.originalUrl,
    method: req.method,
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip,
  };

  logger.info(log);

  next();
};

module.exports = logActivity;
