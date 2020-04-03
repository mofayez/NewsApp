import axios from 'axios';
import appConfig from '../config/app';

export const getEveryThing = async (id, page = null) => {
    return await axios.get(`${appConfig.SERVER_HOST}:${appConfig.SERVER_PORT}/news?id=${id}&page=${page}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}

export const getSources = async (id, page = null) => {
    return await axios.get(`${appConfig.SERVER_HOST}:${appConfig.SERVER_PORT}/news/sources?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}

export const attachSource = async (id, source, attach) => {
    return await axios.put(`${appConfig.SERVER_HOST}:${appConfig.SERVER_PORT}/users/attach-source`, {
        id, source, attach
    }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}