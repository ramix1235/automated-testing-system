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

// USER
export function login(user) {
    return Axios.post('user/login', { user });
}

export function register(user) {
    return Axios.post('user/register', { user });
}

export function getUser() {
    return Axios.get('user');
}

export function logout(id) {
    return Axios.post('user/logout', { id });
}

// TEST
export function createTest(test) {
    return Axios.post('test', { test });
}

export function editTest(test) {
    return Axios.put('test', { test });
}

export function getTest(id) {
    return Axios.get(`test/${id}`);
}

export function removeTest(id) {
    return Axios.delete(`test/${id}`);
}

export function getAllTests() {
    return Axios.get('test');
}

// PASSED TEST
export function createPassedTest(passedTest) {
    return Axios.post('passedTest', { passedTest });
}

export function getPassedTest(id) {
    return Axios.get(`passedTest/${id}`);
}

export function getAllPassedTests() {
    return Axios.get('passedTest');
}