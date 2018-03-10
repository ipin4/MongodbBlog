export default function reducer(
  state = {
    newArticle: {},
    isDone: false,
    error: '',
  }, action) {
  switch (action.type) {
  case 'ADD_NOTE_SUCCESS': {
    return {
      ...state,
      isDone: true,
      newArticle: action.payload,
    };
  }
  case 'ADD_NOTE_ERROR': {
    return {
      ...state,
      isDone: true,
      error: action.payload,
    };
  }
  }
  return state;
}
