//contains login route

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator'); //check the params if valid or not "from express-validator.io"
const User = require('../models/User');

//@route  GET api/auth
//@description  get logged in user
//@access  Private
router.get('/', auth, async (req, res) => {
  //get user from db on basis of token and id
  try {
    const user = await User.findById(req.user.id).select('-password'); //pasword is ignored
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

//@route  POST api/auth
//@description  Auth user and get token
//@access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //take email and passowrd out of the body
    const { email, password } = req.body;
    try {
      //see if user exist
      let user = await User.findOne({ email });
      //if not found
      if (!user) {
        return res.status(400).json({ msg: 'No user found with this account' });
      }
      //if found
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //if password match
      //create payload/object to be sent in token
      const payload = {
        user: {
          id: user.id
        }
      };

      //to generate a token ,sign it first
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//export router

module.exports = router;
