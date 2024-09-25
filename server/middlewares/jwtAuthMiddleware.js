const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require("../models/UserSchema");
const { secretOrKey } = require('../config/keys');

const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies['token'] : null;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey,
};

// Passport JWT strategy
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      if (jwt_payload.userType === "external") {
        return done(null, true);
      }

      const user = await UserModel.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      
      return done(null, false, { message: 'User not found' });
    } catch (err) {
      console.error('Error during JWT authentication:', err);
      return done(err, false);
    }
  })
);


const jwtAuthMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(401).json({ success: false, message: 'Unauthorized', error: err.message });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  jwtAuthMiddleware,
  passport,
};
