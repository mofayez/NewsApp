import {
    SIGNUP,
    SIGNUP_INPUT_CHANGE,
    SIGNIN_INPUT_CHANGE,
    AUTH_VALIDATION_ERROR,
    SIGNIN,
    SIGNOUNT,
    ATTACH_SOURCES
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
// const authToken = JSON.parse(localStorage.getItem('authToken'));
const intiState = {
    user: user ? user : null,
    // authToken: authToken ? authToken : null,
    userIsLogedIn: !!user,
    userSignupInputs: {
        email: '',
        fulltName: '',
        password: ''
    },
    userSigninInputs: {
        email: '',
        password: ''
    },
    authValidationErrors: {},
    successfullyRegistered: false,
    subscribedSources: user ? user.subscribedSources : []
};

const authReducer = (state = intiState, {type, payload}) => {
    switch (type) {
        case SIGNUP_INPUT_CHANGE:
            return {
                ...state,
                userSignupInputs: {
                    ...state.userSignupInputs,
                    [payload.target.id]: payload.target.value
                }
            }
        case SIGNUP:
            return {
                ...state,
                user: payload.userData,
                successfullyRegistered: true
            }
        case SIGNIN:
            return {
                ...state,
                user: payload.user,
                authToken: payload.authToken,
                userIsLogedIn: true
            }
        case SIGNOUNT:
            return {
                ...state,
                user: null,
                authToken: null,
                userIsLogedIn: false
            }
        case SIGNIN_INPUT_CHANGE:
            return {
                ...state,
                userSigninInputs: {
                    ...state.userSigninInputs,
                    [payload.target.id]: payload.target.value
                }
            }
        case AUTH_VALIDATION_ERROR:
            return {
                ...state,
                authValidationErrors: payload.authValidationErrors
            }
        case ATTACH_SOURCES:
            let subscribedSources = [];
            if (payload.attach === 1) {
                subscribedSources = [...state.subscribedSources, payload.source]
            }
            if (payload.attach === 0) {
                subscribedSources = state.subscribedSources.filter(source => {
                    return source !== payload.source
                });
            }
            let user = JSON.parse(localStorage.getItem('user'));
            user.subscribedSources = subscribedSources;
            localStorage.setItem('user', JSON.stringify(user))
            return {
                ...state,
                subscribedSources,
                user
            }

        default:
            return state;
    }
}

export default authReducer
