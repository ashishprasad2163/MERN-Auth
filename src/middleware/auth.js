// import jwt from 'jsonwebtoken';
// import { APP_SECRET } from '../config';

// //next is used to move on next piece of middleware
// export default function (req, res, next) {
//   //get token from header
//   const token = req.headers['x-auth-token'];
//   console.log('TOKEN', token);
//   //check if not token
//   if (!token) {
//     return res.status(401).json({ msg: 'Token missing, Login failed.' });
//   }
//   //if token found,verify
//   try {
//     const decoded = jwt.verify(token, APP_SECRET);
//     //after verification ,payload get into decoded
//     return (req.user = decoded.user);
//     next();
//   } catch (error) {
//     return res.status(401).json({ msg: 'token is not valid' });
//   }
// }

import User from '../models/User';
import passport from 'passport';
import { APP_SECRET as key } from '../config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

const passportConfig = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

export const auth = () => passport.authenticate('jwt', { session: false });

export default passportConfig;
