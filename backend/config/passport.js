// backend/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db');

passport.use(new LocalStrategy(
  function(username, password, done) {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
      if (err) { return done(err); }
      if (result.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const user = result.rows[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // If using 2FA, perform additional verification here
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) { return done(err); }
    done(null, result.rows[0]);
  });
});
