export default {
  setProfile: payload => (dispatch) => {
    dispatch({
      type: 'SET_PROFILE',
      payload,
    });
  },
};
