//contains crud of user jobs
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //needed when using protected routes
const { check, validationResult } = require('express-validator'); //check the params if valid or not "from express-validator.io"
const User = require('../models/User');
const Jobs = require('../models/Jobs');
const randomize = require('randomatic');

//@route  GET api/jobs
//@desc   Get jobs posted by user
//@access  Private
router.get('/', auth, async (req, res) => {
  //pull from db by id and sorted by latest date
  try {
    const jobs = await Jobs.find({ user: req.user.id }).sort({ date: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/jobs
//@desc   Add new job
//@access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('phone', 'Enter a valid mobile number').isLength({ min: 10 }),
      check('standard', 'class cannot not be empty').not().isEmpty(),
      check('school', 'school cannot be empty').not().isEmpty(),
      check('area', 'area cannot be empty').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //generate unique job id for user
    let numberRandom = randomize('0', 5, { exclude: '0' });
    var jobId = 'XJ ' + numberRandom;
    //pull data from body
    const { name, phone, standard, school, area } = req.body;

    //then add it to jobs details model
    try {
      const newJobDetail = new Jobs({
        name,
        phone,
        standard,
        school,
        area,
        user: req.user.id,
        jobId,
      });

      const jobs = await newJobDetail.save();
      res.json(jobs);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('server error');
    }
  }
);
//export router

module.exports = router;
