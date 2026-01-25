import * as axios from 'axios';

const http = axios.default.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default http;
