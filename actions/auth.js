export default {
  login: payload => (dispatch) => {
    // const promise = new Promise((resolve) => {
    //   resolve();
    // });
    //
    // promise.then(() => {
    dispatch({
      type: 'AUTH_LOGIN',
      payload,
    });
    // });
    //
    // return promise;
  },

  logout: () => (dispatch) => {
    // const promise = new Promise((resolve) => {
    //   resolve();
    // });

    // promise.then(() => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
    // });

    // return promise;
  },

  finish: () => (dispatch) => {
    dispatch({
      type: 'AUTH_FINISH',
    });
  },

  setJWToken: payload => (dispatch) => {
    dispatch({
      type: 'AUTH_SET_JWTOKEN',
      payload,
    });
  },

  error: payload => (dispatch) => {
    dispatch({
      type: 'AUTH_ERROR',
      payload,
    });
  },

  greet: () => (dispatch) => {
    dispatch({
      type: 'AUTH_GREET',
    });
  },
};
