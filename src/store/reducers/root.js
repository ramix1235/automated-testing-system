import { combineReducers } from 'redux';

import user from './user';
import test from './test';
import passedTest from './passedTest';

export default combineReducers({
    user,
    test,
    passedTest
});