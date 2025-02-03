// backend/middlewares/ipWhitelist.js
const allowedIPs = ['127.0.0.1', '192.168.32.152']; // Update with allowed IPs

const ipWhitelist = (req, res, next) => {
  const clientIp = req.ip;
  if (allowedIPs.includes(clientIp) || req.isAuthenticated()) { 
    return next();
  }
  return res.status(403).json({ message: 'Your IP is not allowed to access this resource.' });
};

module.exports = ipWhitelist;
