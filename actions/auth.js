import {
  Constants,
  SecureStore,
} from 'expo';

const tokenKeyName = `${Constants.manifest.extra.storagePrefix}__jwToken`;

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

    dispatch({
      type: 'AUTHENTICATING',
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

  getJWTokenFromStorage: () => () => SecureStore.getItemAsync(tokenKeyName),

  setJWToken: payload => (dispatch) => {
    SecureStore.setItemAsync(tokenKeyName, payload);

    dispatch({
      type: 'AUTH_SET_JWTOKEN',
      payload,
    });

    dispatch({
      type: 'LOADING_STOP',
    });
  },


};
