import * as API from '../../API';

export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function login(user) {
    return dispatch => API.login(user)
        .then(response => dispatch({
            type: LOGIN_USER,
            data: response.data
        }));
};

export function register(user) {
    return dispatch => API.register(user)
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

export function logout(id) {
    return dispatch => API.logout(id)
        .then(response => dispatch({
            type: LOGOUT_USER,
            data: response.data
        }));
};