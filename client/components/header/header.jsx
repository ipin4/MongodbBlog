import React from 'react';
import {Route} from 'react-router-dom';

import SearchBar from '../search-bar/search-bar';

import styles from './header.styles';

export default () =>
  <div className={styles.headerContainer}>
    <div className={styles.logosContainer}>
      <div className={styles.headerText}>Mongo<span className={styles.cubeDB}>db</span> Blog</div>
      <span className={styles.spanColor}>frontcamp project</span>
    </div>
    <Route path="/notes" component={SearchBar}/>
  </div>;
