const jwt = require('jsonwebtoken');
const config = require('config');

//next is used to move on next piece of middleware
module.exports = function(req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Token missing, Login failed.' });
  }

  //if token found,verify
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //after verification ,payload get into decoded
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
