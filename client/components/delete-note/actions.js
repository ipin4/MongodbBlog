import {deleteNote, deleteNoteStart} from './delete-note.actions';
import {fetchNotes, fetchNotesStart} from '../note-wrapper/note-wrapper.actions';

export const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (noteId) => {
      dispatch(deleteNoteStart());
      return dispatch(deleteNote(noteId));
    },
    fetchNotes: () => {
      dispatch(fetchNotesStart());
      return dispatch(fetchNotes());
    },
  };
};
