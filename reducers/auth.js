const initialState = {
  username: null,
  password: null,
  token: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return { ...state, token: action.token };
    case 'SAVE_TOKEN':
      return { ...state, token: action.token };
    case 'REMOVE_TOKEN':
      return { ...state, token: action.token };
    case 'LOADING':
      return { ...state, loading: action.isLoading };
    case 'ERROR':
      return { ...state, error: action.error };

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

    case 'AUTH_TOKEN_VALID':
      return {
        ...state,
        loading: false,
      };

    case 'AUTH_SET_TOKEN':
      return {
        ...state,
        token: action.payload,
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
