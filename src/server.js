import {allRoutes} from './routes/index';
import bodyParser from 'body-parser';
import db from '../db';
import express from 'express';
import {MongoClient} from 'mongodb';
import {addToLogInfo} from './logger';

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// log info
app.all('/*', (req, res, next) => {
  addToLogInfo(req);
  next();
});

// view engine
app.set('view engine', 'pug');

MongoClient.connect(db.url, (error, database) => {
  if (error) {
    return console.log(error)
  }

  allRoutes(app, database);
  app.listen(port, () => {
    console.log('Server is run on ' + port);
  });
});


