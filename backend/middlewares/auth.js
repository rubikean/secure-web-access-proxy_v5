// backend/middlewares/auth.js
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'focusadmin') {
      return next();
    }
    res.status(403).json({ message: 'Forbidden: Admins only' });
  };
  
  module.exports = {
    ensureAuthenticated,
    ensureAdmin,
  };
  