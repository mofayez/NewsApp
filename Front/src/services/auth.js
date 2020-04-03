import axios from 'axios';

export const callSignup = async (userData) => {
    return await axios.post('http://localhost:4000/users/signup', userData);
}

export const callSignin = async (userData) => {
    return await axios.post('http://localhost:4000/users/signin', userData);
}


