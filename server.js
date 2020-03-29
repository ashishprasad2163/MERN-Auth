// common json format , import is used when using babel dependencies
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//way to send data or create an endpoint to get request
//app.get('/', (req, res) => res.send('Hello World'));

//for json
app.get('/', (req, res) => res.json({ msg: 'Hii it worked!' }));

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/common', require('./routes/common'));
app.use(express.static(path.join(__dirname, './uploads')));

//PORT is detected in production automatically or provide locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
