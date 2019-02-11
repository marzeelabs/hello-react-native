// TODO: find local IP in dev (needed?), use hardcoded address in prod
const getHost = () => 'http://mzdrupal.lab';

export default (params) => {
  const {
    body,
    headers,
    method,
    path,
  } = params;
  const host = getHost();

  const options = {
    method: method || 'GET',
    headers: Object.assign({
      'Content-Type': 'application/json',
    }, headers),
  };

  if (method === 'POST') {
    options.body = JSON.stringify(body || {});
  }

  return fetch(`${host}${path}?_format=json`, options);
};
