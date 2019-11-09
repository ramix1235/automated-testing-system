import * as API from '../../API';

export const CREATE_PASSED_TEST = 'CREATE_PASSED_TEST';
export const GET_PASSED_TEST = 'GET_PASSED_TEST';
export const GET_ALL_PASSED_TESTS = 'GET_ALL_PASSED_TESTS';

export function create(passedTest) {
    return dispatch => API.createPassedTest(passedTest)
        .then(response => dispatch({
            type: CREATE_PASSED_TEST,
            data: response.data
        }));
};

export function getPassedTest(id) {
    return dispatch => API.getPassedTest(id)
        .then(response => dispatch({
            type: GET_PASSED_TEST,
            data: response.data
        }));
};

export function getAll() {
    return dispatch => API.getAllPassedTests()
        .then(response => dispatch({
            type: GET_ALL_PASSED_TESTS,
            data: response.data
        }));
};