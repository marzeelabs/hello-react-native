import { combineReducers } from 'redux';

import auth from './auth';
import general from './general';
import profile from './profile';

export default combineReducers({
  auth,
  general,
  profile,
});
