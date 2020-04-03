const userModel = require('../../Models/user');

// validatate signup
const validateUserSignUp = async (userData = {}) => {

    let validationResponse = {
        valid: true,
        validationErrors: {}
    };

    // validate fullName: required|len>=4
    if (userData.fullName === undefined || userData.fullName.length < 4) {
        validationResponse.validationErrors.fullName = "The full Name is required and the length should be grater then or equest 4";
    }

    // validate email: required|valid|unique
    if (userData.email !== undefined || userData.fullName.length === 0) {
        if (!isValidEmail(userData.email)) {
            validationResponse.validationErrors.email = "The email is not valid!";;
        } else {
            const user = await userModel.isUsedEmail(userData.email);
            if (user) {
                validationResponse.validationErrors.email = "The email is used before by another account!";
            }
        }
    } else {
        validationResponse.validationErrors.email = "The email is required!";
    }


    // validate password: required|len>=8
    if (userData.password === undefined || userData.password.length < 8) {
        validationResponse.validationErrors.password = "The password is required and the length should be greater than or equal 8!";
    }

    if (Object.keys(validationResponse.validationErrors).length > 0) {
        validationResponse.valid = false;
    }

    return validationResponse;
}

// validatate signin
const validateUserSignin = async (userData = {}) => {

    let validationResponse = {
        valid: true,
        validationErrors: {}
    };

    // validate email: required|valid|unique
    if (userData.email === undefined || userData.email.length === 0) {
        console.log(userData)

        validationResponse.validationErrors.email = "The email is required!";
    }


    // validate password: required|len>=8
    if (userData.password === undefined || userData.password.length === 0) {
        validationResponse.validationErrors.password = "The password is required!";
    }

    if (Object.keys(validationResponse.validationErrors).length > 0) {
        validationResponse.valid = false;
    }

    return validationResponse;
}

// validate email with regex 
const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}


const validateAttachNewsSource = async (userSourceData) => {

    let validationResponse = {
        valid: true,
        validationErrors: {}
    };

    if (userSourceData.id === undefined || userSourceData.id.length === 0) {
        validationResponse.validationErrors.push({
            id: 'user id is required'
        });
    } else {
        const user = await userModel.findUser(userSourceData.id);
        if (!user) {
            validationResponse.validationErrors.source = 'invalid user id';
        }
    }

    if (userSourceData.source === undefined || userSourceData.source.length === 0) {

        validationResponse.validationErrors.source = 'source is required';
    }

    if (userSourceData.attach === undefined || (userSourceData.attach !== 0 && userSourceData.attach !== 1)) {

        validationResponse.validationErrors.attach = 'splease provide attach between 0 and 1';
    }

    if (Object.keys(validationResponse.validationErrors).length > 0) {
        validationResponse.valid = false;
    }

    return validationResponse;
}


const validateUserId = async userId => {
    let validationResponse = {
        valid: true,
        validationErrors: []
    };

    if (userId === undefined || userId.length === 0) {
        validationResponse.validationErrors.id = 'user id is required';
    } else {
        const user = await userModel.findUser(userId);
        if (!user) {
            validationResponse.validationErrors.source = 'invalid user id';
        }
    }

    if (Object.keys(validationResponse.validationErrors) > 0) {
        validationResponse.valid = false;
    }

    return validationResponse;
}

module.exports.validateUserSignUp = validateUserSignUp;
module.exports.validateUserSignin = validateUserSignin;
module.exports.validateAttachNewsSource = validateAttachNewsSource;
module.exports.validateUserId = validateUserId;