import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 30000
});

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    config.headers.authorization = `Bearer ${token}`;

    return config;
});

export function login(email, password) {
    return Axios.post('user/login', { user: { email, password } });
}

export function register(email, password) {
    return Axios.post('user/register', { user: { email, password } });
}

export function getUser(id) {
    return Axios.get('user/current', { id });
}