import {
    callSignup,
    callSignin
} from '../../services/auth';
import {
    SIGNUP_INPUT_CHANGE,
    SIGNUP,
    SIGNIN_INPUT_CHANGE,
    SIGNIN,
    SIGNOUNT,
    AUTH_VALIDATION_ERROR
} from './types';

export const handleSignupInputChange = target => {
    return (dispatch, getState) => {
        dispatch({
            type: SIGNUP_INPUT_CHANGE,
            payload: {
                target
            }
        });
    }
}

export const handleSigninInputChange = target => {
    return (dispatch, getState) => {
        dispatch({
            type: SIGNIN_INPUT_CHANGE,
            payload: {
                target
            }
        });
    }
}

export const signup = userData => {
    return async (dispatch, getState) => {
        // handle async request
        const response = await callSignup(userData);
        if (response.status === 200) {
            if (response.data.status) {
                dispatch({
                    type: SIGNUP,
                    payload: {
                        user: response.data.user
                    }
                });
            } else {
                dispatch({
                    type: AUTH_VALIDATION_ERROR,
                    payload: {
                        authValidationErrors: response.data.error.validationErrors
                    }
                });
            }

        } else {
            alert('Internal Server Error');
        }
    }
}

export const signout = () => {
    return async (dispatch, getState) => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        dispatch({
            type: SIGNOUNT
        });
    }
}


export const signin = userData => {
    return async (dispatch, getState) => {
        const response = await callSignin(userData);
        if (response.status === 200) {
            if (response.data.status) {
                const user = response.data.data.user
                const authToken = response.data.data.token
                dispatch({
                    type: SIGNIN,
                    payload: {
                        user,
                        authToken
                    }
                });
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('authToken', JSON.stringify(authToken));
                location.href = '/'
            } else {

                dispatch({
                    type: AUTH_VALIDATION_ERROR,
                    payload: {
                        authValidationErrors: response.data.error.validationErrors
                    }
                });
            }

        } else {
            alert('Internal Server Error');
        }
    }
}