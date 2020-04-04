const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  aadhar: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  phone2: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: false,
  },
  accountNumber: {
    type: Number,
    required: false,
  },
  ifsc: {
    type: String,
    required: false,
  },
  affiliateId: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
