//contains login route

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { auth } from '../middleware/auth';
import { check, validationResult } from 'express-validator'; //check the params if valid or not "from express-validator.io"
import User from '../models/User';
import { issueToken } from './functions/Auth';

const router = express.Router();

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
    check('password', 'Please enter password').exists(),
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
        username: user.username,
        email: user.email,
        id: user.id,
      };

      //to generate a token ,sign it first
      let token = await issueToken(payload);
      return res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//export router

export default router;
