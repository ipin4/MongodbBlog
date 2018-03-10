import {createAction} from 'redux-actions';

export const addNoteSuccess = createAction('ADD_NOTE_SUCCESS');
export const addNoteError = createAction('ADD_NOTE_ERROR');

export const addNewNote = (data) => {
  const params = {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(data),
  };

  return dispatch => fetch('/blogs', params)
    .then(response => response.json())
    .then((response) => dispatch(addNoteSuccess(response)))
    .catch(errors => dispatch(addNoteError(errors)));
}

export const updateNote = (data) => {
  const params = {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(data),
  };

  return dispatch => fetch(`/blogs/${data.noteId}`, params)
    .then((response) => dispatch(addNoteSuccess(response)))
    .catch(errors => dispatch(addNoteError(errors)));
}
