const initialState = {
  savedValue: 'Foo',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SAVED_VALUE':
      return Object.assign({}, state, {
        savedValue: action.payload,
      });
  }

  return state;
};
