export default (type, response, error) => response
  .json()
  .then((responseJson) => {
    if (response.ok) {
      return responseJson;
    }

    if (responseJson.message) {
      const params = require('./errors/errors.json')[type];

      // eslint-disable-next-line no-restricted-syntax
      for (let message of params.knownMessages) {
        if (typeof message === 'string') {
          message = [ message ];
        }

        if (message[0] === responseJson.message) {
          const str = message[1] || responseJson.message;
          error(`${params.prefix} : ${str}`);

          return false;
        }
      }

      error(`${params.prefix} : ${responseJson.message}`);

      return false;
    }

    error('Unknown error!');

    return false;
  });
