//contains crud

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //needed when using protected routes
const { check, validationResult } = require('express-validator'); //check the params if valid or not "from express-validator.io"
const User = require('../models/User');
const Common = require('../models/Common');

//@route  GET api/common
//@desc   Get all users details
//@access  Private
router.get('/', auth, async (req, res) => {
  //pull from db by id and sorted by latest date
  try {
    const common = await Common.find({ user: req.user.id }).sort({ date: -1 });
    res.json(common);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/common
//@desc   Add new details
//@access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('phone', 'Enter a valid mobile number').isLength({ min: 10 }),
      check('aadhar', 'Enter a valid aadhar number').isLength({ min: 12 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //pull data from body
    const { name, phone, aadhar } = req.body;

    //then add it to common details model
    try {
      const newDetail = new Common({
        name,
        phone,
        aadhar,
        user: req.user.id
      });

      const common = await newDetail.save();
      res.json(common);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route  PUT api/common/:id
//@desc   Update details
//@access  Private
router.put('/:id', (req, res) => {
  res.send('Update details');
});

//@route  DELETE api/common/:id
//@desc   Delete details
//@access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete details');
});

//export router

module.exports = router;
