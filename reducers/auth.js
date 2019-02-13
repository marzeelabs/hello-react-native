const initialState = {
  username: null,
  password: null,
  jwToken: null,
  csrfToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...initialState,
        username: action.payload.username,
        password: action.payload.password,
      };

    case 'AUTH_LOGOUT':
      return {
        ...initialState,
      };

    case 'AUTH_SET_JWTOKEN':
      return {
        ...state,
        username: null,
        password: null,
        jwToken: action.payload,
      };

    case 'AUTH_SET_CSRFTOKEN':
      return {
        ...state,
        csrfToken: action.payload,
      };
  }

  return state;
};
