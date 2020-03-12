//contains login route

const express = require('express');
const router = express.Router();

//@route  GET api/auth
//@description  get logged in user
//@access  Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

//@route  POST api/auth
//@description  Auth user and get token
//@access  Public
router.post('/', (req, res) => {
  res.send('Login user');
});
//export router

module.exports = router;
