import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import NoteItem from '../note-item/note-item';
import {mapDispatchToProps} from './actions';
import {fetchNotes} from './note-wrapper.actions';

import styles from './note-wrapper.styles';

const mapStateToProps = (state) => {
  return {
    allNotes: state.wrapperReducer.allNotes,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Content extends Component {
  static fetchData(dispatch, match, url) {
    return dispatch(fetchNotes(url));
  }

  prepareNotes = () => {
    const {allNotes} = this.props;
    const {filterBy} = this.props.location.state ?
      this.props.location.state : '';
    const re = new RegExp(filterBy, 'gi');

    const notes = [...allNotes]
      .sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      }).filter((item) => {
        return re.test(`${item.title} ${item.body}`);
      });

    return notes;
  }

  render() {
    const notes = this.prepareNotes();

    return <div className={styles.cardsWrapper}>
      <div className={styles.createItemWrapper}>
        <Link to={'/notes/modal'}><h2>Create New</h2></Link>
      </div>
      {
        notes.length ?
          notes.map((item) =>
            <div key={item._id} className={styles.itemWrapper}>
              <NoteItem item={item}/>
            </div>) : null
      }
    </div>;
  }
}
