/* eslint-disable import/prefer-default-export */

export const changeSavedValue = payload => (dispatch) => {
  const promise = new Promise((resolve, reject) => {
    resolve();
  });

  promise.then(() => {
    dispatch({
      type: 'CHANGE_SAVED_VALUE',
      payload,
    });
  });

  return promise;
};
