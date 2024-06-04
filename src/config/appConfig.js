import CryptoJS from 'crypto-js'

const uniqueBaseKey = "08520";

export const isAuth = () => {
    return window.localStorage.getItem("uid");
};

export const encryptData = (secreteKey, data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), (secreteKey + uniqueBaseKey)).toString();
};

export const decryptData = (secreteKey, data) => {
    if (data) {
        const bytes = CryptoJS.AES.decrypt(data, (secreteKey + uniqueBaseKey));
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
};

export const saveData = (key, data) => {
    if (getData(key)) removeData(key);
    window.localStorage.setItem(key, encryptData(key, data));
};

export const getData = (key) => {
    return decryptData(key, window.localStorage.getItem(key));
};

export const clearData = () => {
    window.localStorage.clear();
};

export const removeData = (key) => {
    window.localStorage.removeItem(key);
};

export const sessionTimeout = async () => {
    localStorage.clear();
};