'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const memeRoute = require('./routes/memeRoute');

// Selvitä mitkä näistä tarpeellisia
//const userRoute = require('./routes/userRoute');
//const authRoute = require('./routes/authRoute');
//const passport = require('./utils/pass');
const { httpError } = require('./utils/errors');

// Portit
const app = express();
const port = 5000;
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('./uploads/'));
//app.use('/thumbnails', express.static('thumbnails'));

//app.use(passport.initialize());

//app.use('/auth', authRoute);
app.use('/meme', memeRoute);
//app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);

app.use((req, res, next) => {
  const err = httpError('Not found (cannot GET /)', 404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'internal server error',
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
