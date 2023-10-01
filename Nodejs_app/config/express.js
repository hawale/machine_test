require('./database').connect();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../routes/');
const passport = require('../middleware/passport');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api',routes);

module.exports = app;
