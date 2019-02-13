module.exports = [
  {
    message: 'This route can only be accessed by authenticated users.',
    replace: (response, state) => {
      if (response.status === 403 && state.jwToken && !state.username && !state.password) {
        return 'Something went wrong, you should not be able to access the requested information.';
      }

      return 'Authentication failed: the username or password do not match.';
    },
  },
  {
    message: 'Expired token',
    replace: () => 'Your session expired, please login again.',
  },
  {
    message: 'Invalid session token.',
    replace: () => 'Your session is not valid, please try to login again.',
  },
];
