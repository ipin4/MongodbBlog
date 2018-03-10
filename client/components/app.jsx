import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import 'isomorphic-fetch';

import Header from './header/header';
import NoteWrapper from './note-wrapper/note-wrapper';
import CreateNote from './create-note/create-note';

// import routes from '../routes';

import styles from './app.styles';

export default withRouter(() =>
  <div className={styles.common}>
    <Header/>
    <Route path="/notes" component={NoteWrapper}/>
    <Route path="/notes/modal" component={CreateNote}/>
  </div>
);
