import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 1000
});

export function login(email, password) {
    return Axios.post('login', { email, password });
}

export function register(email, password) {
    return Axios.post('register', { email, password });
}

export function getUser(id) {
    return Axios.get(`/user/${id}`);
}