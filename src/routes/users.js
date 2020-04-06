//contains register route

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator'; //check the params if valid or not "from express-validator.io"
import User from '../models/User';
import randomize from 'randomatic';
import { issueToken } from './functions/Auth';

const router = express.Router();
//@route  POST  api/users
//@description  Register a user
//@access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must contain atleast six characters').isLength({
      min: 6,
    }),
    check('phone', 'Enter a valid mobile number').isLength({ min: 10 }),
    check('aadhar', 'Enter a valid aadhar number').isLength({ min: 12 }),
    check('category', 'Category is required').not().isEmpty(),
    check('orgName', 'orgName is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //generate unique id for user
    let numberRandom = randomize('0', 5, { exclude: '0' });
    var affiliateId = 'XAF ' + numberRandom;
    console.log(affiliateId);

    //res.send(req.body); //req.body provides info like name,email,password and to use it , add a middleware in server.js
    //req.body has info we need,we will destructure it in next line.

    try {
      const { email } = req.body;
      //check if user already present by email param
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User exists.' });
      }

      //if not exist , add new user in User model
      const newUser = await User.create(req.body);

      //create payload/object to be sent in token
      const payload = {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
      };

      //to generate a token ,sign it first
      let token = await issueToken(payload);
      return res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).send('server error');
    }
  }
);

//export router

export default router;
