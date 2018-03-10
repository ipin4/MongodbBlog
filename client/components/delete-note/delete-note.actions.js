import {createAction} from 'redux-actions';

export const deleteNoteStart = createAction('DELETE_NOTE_START');
export const deleteNoteSuccess = createAction('DELETE_NOTE_SUCCESS');
export const deleteNoteError = createAction('DELETE_NOTE_ERROR');

export const deleteNote = (id) => {
  const params = {
    method: 'DELETE',
    headers: new Headers(),
  };

  return dispatch => fetch(`/blogs/${id}`, params)
    .then(response => response.json())
    .then(() => dispatch(deleteNoteSuccess()))
    .catch(errors => dispatch(deleteNoteError(errors)));
}
