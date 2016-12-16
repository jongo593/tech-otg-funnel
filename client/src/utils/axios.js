import axios from 'axios';
import config from '../config';

let instance = axios.create({
	baseURL: config.SERVER_BASE_URL
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;

