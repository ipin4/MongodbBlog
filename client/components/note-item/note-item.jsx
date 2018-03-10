import React from 'react';
import {Link} from 'react-router-dom';

import DeleteNote from '../delete-note/delete-note';
import EditButton from '../edit-note/edit-note';

import styles from './note-item.styles';

const prepareDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const curentDate = new Date(date);
  return date ?
    curentDate.toLocaleDateString('en-US', options) : 'no info';
};

export default ({item}) =>
  <div>
    <DeleteNote noteId={item._id}/>
    <Link to={{
      pathname: '/notes/modal',
      state: {noteId: item._id, oldBody: item.body, oldTitle: item.title}
    }}>
      <EditButton noteId={item._id}/>
    </Link>
    <h2>{item.title}</h2>
    <div>{item.body}</div>
    <div className={styles.createdUpdatedWrapper}>
      <div className={styles.createdUpdated}>
        Created at: <span>{prepareDate(item.created_at)}</span>
      </div>
      <div className={styles.createdUpdated}>
        Updated at: <span>{prepareDate(item.updated_at)}</span>
      </div>
    </div>
  </div>;
