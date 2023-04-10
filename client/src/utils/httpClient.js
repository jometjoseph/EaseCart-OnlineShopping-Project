import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://localhost:7258/',
    // headers: {
    //     'Content-Type': 'x-www-form-urlencoded'
    // }
});

export default httpClient;