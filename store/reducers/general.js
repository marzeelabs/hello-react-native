const initialState = {
  authenticating: true,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        authenticating: false,
        error: {
          message: action.payload,
          timestamp: Date.now(),
        },
        loading: false,
      };

    case 'AUTHENTICATING':
      return {
        ...state,
        authenticating: true,
        error: null,
        loading: true,
      };

    case 'LOADING_START':
      return {
        ...state,
        error: null,
        loading: true,
      };

    case 'LOADING_STOP':
      return {
        ...state,
        authenticating: false,
        error: null,
        loading: false,
      };
  }

  return state;
};
