import {fetchNotes, fetchNotesStart} from './note-wrapper.actions';

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: () => {
      dispatch(fetchNotesStart());
      dispatch(fetchNotes());
    },
  };
};
