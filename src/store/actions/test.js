import * as API from '../../API';

export const CREATE_TEST = 'CREATE_TEST';
export const EDIT_TEST = 'EDIT_TEST';
export const REMOVE_TEST = 'REMOVE_TEST';
export const GET_TEST = 'GET_TEST';
export const GET_ALL_TESTS = 'GET_ALL_TESTS';

export function create(test) {
    return dispatch => API.createTest(test)
        .then(response => dispatch({
            type: CREATE_TEST,
            data: response.data
        }));
};

export function edit(test) {
    return dispatch => API.editTest(test)
        .then(response => dispatch({
            type: EDIT_TEST,
            data: response.data
        }));
};

export function remove(id) {
    return dispatch => API.removeTest(id)
        .then(response => dispatch({
            type: REMOVE_TEST,
            data: response.data
        }));
};

export function getTest(id) {
    return dispatch => API.getTest(id)
        .then(response => dispatch({
            type: GET_TEST,
            data: response.data
        }));
};

export function getAllTests() {
    return dispatch => API.getAllTests()
        .then(response => dispatch({
            type: GET_ALL_TESTS,
            data: response.data
        }));
};