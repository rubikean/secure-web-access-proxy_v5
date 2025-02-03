// backend/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const ipWhitelist = require('./middlewares/ipWhitelist');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bladeRoutes = require('./routes/blade');

require('./config/passport'); // Initialize Passport configuration

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'your_secret_key_here', // Change this to a secure secret
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Apply IP Whitelisting middleware to sensitive routes (or adjust per route as needed)
app.use(ipWhitelist);

// Serve static files (login, index, admin pages)
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/blade', bladeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
