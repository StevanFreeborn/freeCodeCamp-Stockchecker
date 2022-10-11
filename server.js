'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const stockRoutes = require('./routes/stocks');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
  }
}))

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

fccTestingRoutes(app);
stockRoutes(app);

app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// TODO: Connect to database on start-up.

let mongoConnectionString; 

switch (process.env.NODE_ENV) {
  case 'development':
    mongoConnectionString = process.env.MONGO_DEV_URI
    break;
  case 'test':
    mongoConnectionString = process.env.MONGO_TEST_URI
    break;
  default:
    mongoConnectionString = process.env.MONGO_PROD_URI
    break;
}

mongoose
.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log(`Mongoose connected successfully to ${proccess.env.NODE_ENV} database.`);
})
.catch(() => {

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
  
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app;
