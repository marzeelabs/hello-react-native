/* eslint-disable import/prefer-default-export */

export const actionLogin = payload => (dispatch) => {
  const promise = new Promise((resolve) => {
    resolve();
  });

  promise.then(() => {
    dispatch({
      type: 'AUTH_LOGIN',
      payload,
    });
  });

  return promise;
};

export const actionLogout = () => (dispatch) => {
  const promise = new Promise((resolve) => {
    resolve();
  });

  promise.then(() => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
  });

  return promise;
};
