//contains crud of user jobs
import express from 'express';
import auth from '../middleware/auth'; //needed when using protected routes
import { check, validationResult } from 'express-validator'; //check the params if valid or not "from express-validator.io"
import User from '../models/User';
import Jobs from '../models/Jobs';
import randomize from 'randomatic';

const router = express.Router();
//@route  GET api/jobs
//@desc   Get jobs posted by user
//@access  Private
router.get('/', auth, async (req, res) => {
  //pull from db by id and sorted by latest date
  try {
    // const jobs = await Jobs.find({ user: req.user.id }).sort({ date: -1 });
    const myCustomLabels = {
      totalDocs: 'jobCount',
      docs: 'jobs',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'pageCount',
      pagingCounter: 'slNo',
      meta: 'paginator',
    };

    const options = {
      limit: 3,
      customLabels: myCustomLabels,
      page: req.query.page ? parseInt(req.query.page) : 1,
    };

    let jobs = await Jobs.paginate({}, options);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
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

export default router;
