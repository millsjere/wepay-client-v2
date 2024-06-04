import axios from "axios";
import { getData } from "./appConfig";

const LIVEURL = 'https://api.wepaygh.com/'
const DEVURL = 'http://localhost:8000/'
const base = axios.create({
	baseURL: DEVURL || LIVEURL,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
	},
});

base.interceptors.request.use((config) => {
	// console.log(config);
	const token = getData('uac');
	console.log('TOKEN', token)
	if (token) {
		config.headers.Authorization = `JWT ${token}`;
	}
	return config;
});

export default base