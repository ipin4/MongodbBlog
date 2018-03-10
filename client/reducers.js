import {combineReducers} from 'redux';

import createNoteReducer from './components/create-note/create-note.reducer';
import wrapperReducer from './components/note-wrapper/note-wrapper.reducer';
import deleteNoteReducer from './components/delete-note/delete-note.reducer';

export default combineReducers({
  createNoteReducer,
  wrapperReducer,
  deleteNoteReducer,
});
