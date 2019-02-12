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

        const responseJson = await response.json();

        if (responseJson.message) {
          const errors = require('./errors/errors.json');

          // eslint-disable-next-line no-restricted-syntax
          for (let message of errors) {
            if (typeof message === 'string') {
              message = [ message ];
            }

            if (message[0] === responseJson.message) {
              const str = message[1] || responseJson.message;

              dispatch({
                type: 'ERROR',
                payload: `${str}`,
              });

              return false;
            }
          }

          dispatch({
            type: 'ERROR',
            payload: `${responseJson.message}`,
          });

          return false;
        }

        dispatch({
          type: 'ERROR',
          payload: 'Unknown error!',
        });

        return false;
      })
      .catch((ex) => {
        // eslint-disable-next-line no-console
        console.warning(ex);

        dispatch({
          type: 'ERROR',
          payload: 'Unknown error!',
        });
      });
  },
};
