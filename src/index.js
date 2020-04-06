// common json format , import is used when using babel dependencies
import path from 'path';
import express from 'express';
import passport from 'passport';
import connectDB from './config/db';
import { APP_PORT } from './config';

import psp from './middleware/auth';
const app = express();

//Init middleware
app.use(express.json({ extended: false }));

app.use(passport.initialize());
psp(passport);

//way to send data or create an endpoint to get request
//app.get('/', (req, res) => res.send('Hello World'));

//for json
app.get('/', (req, res) => res.json({ msg: 'Hii it worked!' }));

import userRouter from './routes/users';
import authRouter from './routes/auth';
import commonRouter from './routes/common';
import jobsRouter from './routes/jobs';

//define routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/common', commonRouter);
app.use('/api/jobs', jobsRouter);
app.use(express.static(path.join(__dirname, './uploads')));

//PORT is detected in production automatically or provide locally

const startApp = async () => {
  try {
    //connect database
    await connectDB();
    app.listen(APP_PORT, () => console.log(`SERVER STARTED ON ${APP_PORT}`));
  } catch (err) {
    console.log('Errr', err);
  }
};

startApp();
