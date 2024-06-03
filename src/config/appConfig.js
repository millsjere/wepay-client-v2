import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";


const token = Cookies.get('user_jwt');

export const isAuth = () => {
    token ? console.log('TOKEN ==>', token) : console.log('NO TOKEN', token)
    return Boolean(token)
};

export const getData = () => {
    return token ? jwtDecode(token) : null;
};