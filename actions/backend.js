import auth from './auth';
import general from './general';

// @TODO: find local IP in dev (needed?), use hardcoded address in prod
const getHost = () => 'http://mzdrupal.lab';

export default {
  remote: params => (dispatch, getState) => {
    if (typeof params === 'string') {
      params = {
        path: params,
      };
    }

    const host = getHost();

    const options = {
      method: params.method || 'GET',
      headers: Object.assign({
        'Content-Type': 'application/json',
      }, params.headers),
    };

    if (params.method === 'POST') {
      options.body = JSON.stringify(params.body || {});
    }

    if (!params.auth) {
      const state = getState();
      const { jwToken } = state.auth;

      options.headers.Authorization = `Bearer ${jwToken}`;
    }

    return fetch(`${host}${params.path}?_format=json`, options)
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        switch (response.status) {
          // Access denied means the user has been blocked or the token is
          // invalid.
          case 403:
            auth.logout()(dispatch);
            break;
        }

        const responseJson = await response.json();

        if (responseJson.message) {
          const errors = require('./errors/errors');

          // eslint-disable-next-line no-restricted-syntax
          for (let error of errors) {
            if (typeof error === 'string') {
              error = { message: error };
            }

            if (error.message === responseJson.message) {
              const state = getState();

              const payload = error.replace
                ? error.replace(response, state)
                : responseJson.message;

              general.error(payload)(dispatch);

              return false;
            }
          }

          general.error(responseJson.message)(dispatch);

          return false;
        }

        general.error('Unknown error!')(dispatch);

        return false;
      })
      .catch((ex) => {
        // eslint-disable-next-line no-console
        console.warn(ex);

        general.error('Unknown error!')(dispatch);

        return false;
      });
  },
};
