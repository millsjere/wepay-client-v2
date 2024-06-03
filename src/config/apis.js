import axios from "axios";

const URL = 'https://api.wepaygh.com/v2/'
const base = axios.create({
	baseURL: URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
	},
});

base.interceptors.request.use((config) => {
	console.log(config);
	const token = localStorage.getItem('uac');
	if (token) {
		config.headers.Authorization = `JWT ${token}`;
	}
	return config;
});

export default base