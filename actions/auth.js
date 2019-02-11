import {
  Constants,
  SecureStore,
} from 'expo';

const tokenKeyName = `${Constants.manifest.extra.storagePrefix}__jwToken`;

export const getStoredToken = () => SecureStore.getItemAsync(tokenKeyName);

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
    SecureStore.deleteItemAsync(tokenKeyName);

    dispatch({
      type: 'AUTH_LOGOUT',
    });
  },

  finish: () => (dispatch) => {
    dispatch({
      type: 'AUTH_FINISH',
    });
  },

  setJWToken: payload => (dispatch) => {
    SecureStore.setItemAsync(tokenKeyName, payload);

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
