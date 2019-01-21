const initialState = {
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
        ...state,
        token: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        token: null,
      };
  }

  return state;
};
