export default {
  error: payload => (dispatch) => {
    dispatch({
      type: 'ERROR',
      payload,
    });
  },

  loadingStart: () => (dispatch) => {
    dispatch({
      type: 'LOADING_START',
    });
  },

  loadingStop: () => (dispatch) => {
    dispatch({
      type: 'LOADING_STOP',
    });
  },
};
