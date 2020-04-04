const mongoose = require('mongoose');
const CommonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  profilePicture: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('common', CommonSchema);
