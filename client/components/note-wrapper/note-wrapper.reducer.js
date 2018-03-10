export default function reducer(
  state = {
    fetching: false,
    allNotes: [],
    error: '',
  }, action) {
  switch (action.type) {
  case 'START_FETCH_NOTES': {
    return {...state, fetching: true}
  }
  case 'FETCH_NOTES_SUCCESS': {
    return {
      ...state,
      fetching: false,
      allNotes: action.payload,
    }
  }
  case 'FETCH_NOTES_ERROR': {
    return {
      ...state,
      fetching: false,
      error: action.payload,
    };
  }
  }
  return state;
}
