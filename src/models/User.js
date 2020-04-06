import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const UserSchema = Schema(
  {
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
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

export default model('user', UserSchema);
