import {allRoutes} from './routes/index';
import bodyParser from 'body-parser';
import db from '../db';
import express from 'express';
import {addToLogInfo, addToErrorLogInfo} from './middlewares/logger';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//init session
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "session secret"
}));
app.use(passport.initialize());
app.use(passport.session());

// log info
app.all('/*', (req, res, next) => {
  addToLogInfo(req);
  next();
});

// view engine
app.set('view engine', 'pug');

mongoose.connect(db.url);
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));

allRoutes(app, database);

//Error handling
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  addToErrorLogInfo(err);
  res.status(500).send(err.message);
})

app.listen(port, () => {
  console.log('Server is run on ' + port);
});


