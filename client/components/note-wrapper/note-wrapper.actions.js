import {createAction} from 'redux-actions';

export const fetchNotesStart = createAction('START_FETCH_NOTES');
export const fetchNotesSuccess = createAction('FETCH_NOTES_SUCCESS');
export const fetchNotesError = createAction('FETCH_NOTES_ERROR');

export const fetchNotes = (url) => {
  const params = {
    method: 'GET',
    headers: new Headers(),
  };

  return dispatch => fetch(`${url || ''}/blogs`, params)
    .then(response => response.json())
    .then(response => {
      dispatch(fetchNotesSuccess(response));
    })
    .catch(errors => dispatch(fetchNotesError(errors)));
}
