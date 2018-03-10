import React, {Component} from 'react';
import {connect} from 'react-redux';

import {mapDispatchToProps} from './actions';

import styles from './create-note.styles';

const mapStateToProps = (state) => {
  return {
    isDone: state.createNoteReducer.isDone,
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateNote extends Component {
  state = {title: '', body: '', noteId: ''};

  componentWillMount() {
    if (this.props.location.state) {
      const {noteId, oldBody, oldTitle} = this.props.location.state;
      this.setState({title: oldTitle, body: oldBody, noteId});
    }
  }

  titleChange = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  }

  bodyChange = (ev) => {
    this.setState({
      body: ev.target.value,
    });
  }

  createNote = () => {
    this.props.addNewNote(this.state)
      .then(() => {
        this.props.fetchNotes()
          .then(() => this.updateAllNotes());
      });
  }

  updateExistNote = () => {
    this.props.updateNote(this.state)
      .then(() => this.updateAllNotes());
  }

  updateAllNotes = () => {
    this.props.fetchNotes()
      .then(() => this.props.history.push('/notes'));
  }

  closeModal = (ev) => {
    ev.stopPropagation();
    this.props.history.push('/notes');
  }

  stopContainerPropagation = (ev) => {
    ev.stopPropagation();
  }

  render() {
    return <div onClick={this.closeModal} className={styles.moduleField}>
      <div onClick={this.stopContainerPropagation} className={styles.moduleWrapper}>
        <h2>Title:</h2>
        <input onChange={this.titleChange} value={this.state.title} type="text"/>
        <h2>Body:</h2>
        <textarea onChange={this.bodyChange} value={this.state.body}/>
        <div className={styles.buttonsContainer}>
          <button onClick={this.closeModal} className={styles.inverseButton}>Cancel</button>
          {this.state.noteId ?
            <button onClick={this.updateExistNote}>Update</button> :
            <button onClick={this.createNote}>Create</button>}
        </div>
      </div>
    </div>;
  }
}
