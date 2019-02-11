const initialState = {
  username: null,
  password: null,
  jwToken: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...initialState,
        username: action.payload.username,
        password: action.payload.password,
        loading: true,
        error: null,
      };

    case 'AUTH_LOGOUT':
      return initialState;

    case 'AUTH_FINISH':
      return {
        ...state,
        loading: false,
      };

    case 'AUTH_SET_JWTOKEN':
      return {
        ...state,
        username: null,
        password: null,
        jwToken: action.payload,
        loading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        error: {
          message: action.payload,
          timestamp: Date.now(),
        },
        loading: false,
      };

    case 'AUTH_GREET':
      return {
        ...state,
        loading: false,
      };
  }

  return state;
};
