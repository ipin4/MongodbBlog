import {addNewNote, updateNote} from './create-note.actions';
import {fetchNotes, fetchNotesStart} from '../note-wrapper/note-wrapper.actions';

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewNote: (data) => dispatch(addNewNote(data)),
    updateNote: (data) => dispatch(updateNote(data)),
    fetchNotes: () => {
      dispatch(fetchNotesStart());
      return dispatch(fetchNotes());
    },
  };
}
