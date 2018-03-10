export default function reducer(
  state = {
    isDeleted: false,
    error: '',
  }, action) {
  switch (action.type) {
  case 'DELETE_NOTE_START': {
    return {
      ...state,
      isDeleted: false,
    };
  }
  case 'DELETE_NOTE_SUCCESS': {
    return {
      ...state,
      isDeleted: true,
    };
  }
  case 'DELETE_NOTE_ERROR': {
    return {
      ...state,
      isDeleted: false,
      error: action.payload,
    };
  }
  }
  return state;
}
