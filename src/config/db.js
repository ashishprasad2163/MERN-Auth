//connect to db

import mongoose from 'mongoose';
import { DB } from './index';

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MONGODB CONNECTED!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
