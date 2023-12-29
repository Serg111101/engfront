import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL


export default axios.create({
    baseURL: URL
});
export const useraxios = axios.create({
    baseURL:` ${URL}api/v1/users`
});