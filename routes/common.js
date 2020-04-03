//contains crud

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //needed when using protected routes
const { check, validationResult } = require('express-validator'); //check the params if valid or not "from express-validator.io"
const User = require('../models/User');
const Common = require('../models/Common');
const multer = require('multer');

const { handleFilePath } = require('./function');

const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, './uploads'),
  filename: (req, file, done) => {
    let lastIndex = file.originalname.lastIndexOf('.');
    // Get Original File Extension
    let extension = file.originalname.substring(lastIndex);
    done(
      null,
      file.fieldname +
        '-' +
        new Date().toISOString().replace(/:|\./g, '') +
        extension
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  },
  fileFilter: fileFilter
});

/*
working logic
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
});*/

//new logic for getting image
//@route  GET api/common
//@desc   Get all users details
//@access  Private
router.get('/', auth, async (req, res) => {
  //pull from db by id and sorted by latest date
  try {
    const common = await Common.findOne({ user: req.user.id }).sort([
      ['profilePicture', -1]
    ]);
    res.json(common.profilePicture);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
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
);*/

//new end point with profile image upload
//@route  POST api/common
//@desc   Add new details
//@access  Private
router.post('/', [auth, upload.single('profilePicture')], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.file.filename);

  const staticPath = await handleFilePath(req.file.filename);

  //pull data from body
  //const { name, phone, aadhar } = req.body;

  //then add it to common details model
  try {
    const newDetail = new Common({
      //name,
      // phone,
      // aadhar,
      user: req.user.id,
      profilePicture: req.file.filename
    });

    const common = await newDetail.save();
    res.json(common);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

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
