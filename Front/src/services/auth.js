import axios from 'axios';
import appConfig from '../config/app';

export const callSignup = async (userData) => {
    return await axios.post(`${appConfig.SERVER_HOST}:${appConfig.SERVER_PORT}/users/signup`, userData);
}

export const callSignin = async (userData) => {
    return await axios.post(`${appConfig.SERVER_HOST}:${appConfig.SERVER_PORT}/users/signin`, userData);
}


