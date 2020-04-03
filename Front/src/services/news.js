import axios from 'axios';

export const getEveryThing = async (id, page = null) => {
    return await axios.get(`http://localhost:4000/news?id=${id}&page=${page}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}

export const getSources = async (id, page = null) => {
    return await axios.get(`http://localhost:4000/news/sources?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}

export const attachSource = async (id, source, attach) => {
    return await axios.put(`http://localhost:4000/users/attach-source`, {
        id, source, attach
    }, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`
        }
    });
}