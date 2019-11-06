import * as API from '../../API';

export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const GET_USER = 'GET_USER';

export function login(email, password) {
    return dispatch => API.login(email, password)
        .then(response => dispatch({
            type: LOGIN_USER,
            data: response.data
        }));
};

export function register(email, password) {
    return dispatch => API.register(email, password)
        .then(response => dispatch({
            type: REGISTER_USER,
            data: response.data
        }));
};

export function getUser(id) {
    return dispatch => API.getUser(id)
        .then(response => dispatch({
            type: GET_USER,
            data: response.data
        }));
};