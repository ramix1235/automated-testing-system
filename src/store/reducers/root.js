import { combineReducers } from 'redux';

import user from './user';
import test from './test';

export default combineReducers({
    user,
    test
});