import React, {Component} from 'react';
import {connect} from 'react-redux';

import {mapDispatchToProps} from './actions';

import styles from './delete-note.styles';

const mapStateToProps = (state) => {
  return {
    isDeleted: state.deleteNoteReducer.isDeleted,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DeleteNote extends Component {
  deleteNote = () => {
    const {noteId} = this.props;
    this.props.deleteNote(noteId)
      .then(() => this.props.fetchNotes());
  }

  render() {
    return <div onClick={this.deleteNote} className={styles.deleteCircle}>D</div>;
  }
}
