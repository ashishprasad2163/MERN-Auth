//contains crud

const express = require('express');
const router = express.Router();

//@route  GET api/common
//@desc   Get all users details
//@access  Private
router.get('/', (req, res) => {
  res.send('Get all details');
});

//@route  POST api/common
//@desc   Add new details
//@access  Private
router.post('/', (req, res) => {
  res.send('Add details');
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
