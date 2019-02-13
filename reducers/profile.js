const initialState = {
  name: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGOUT':
      return initialState;

    case 'SET_PROFILE':
      return {
        ...state,
        name: action.payload.name,
      };
  }

  return state;
};
