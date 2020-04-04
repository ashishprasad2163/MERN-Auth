const mongoose = require('mongoose');
const JobsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  jobId: {
    type: String,
  },
});

module.exports = mongoose.model('jobs', JobsSchema);
