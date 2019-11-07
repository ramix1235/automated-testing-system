import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 30000
});

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

export function login(user) {
    return Axios.post('user/login', { user });
}

export function register(user) {
    return Axios.post('user/register', { user });
}

export function getUser(id) {
    return Axios.get('user/current', { id });
}

export function logout(id) {
    return Axios.post('user/logout', { id });
}