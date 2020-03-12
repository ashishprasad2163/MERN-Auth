// common json format , import is used when using babel dependencies
const express = require('express');

const app = express();

//way to send data or create an endpoint to get request
//app.get('/', (req, res) => res.send('Hello World'));

//for json
app.get('/', (req, res) => res.json({ msg: 'Hii it worked!' }));

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/common', require('./routes/common'));

//PORT is detected in production automatically or provide locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
