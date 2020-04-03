const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../Models/user');
const userValidation = require('../Support/userValidation');

// register new user
const signup = async (req, res) => {

    let requestBody = req.body;

    // validate user data
    const validationResponse = await userValidation.validateUserSignUp(requestBody);
    if (!validationResponse.valid) {
        return res.status(200).json({
            status: false,
            message: 'validation error',
            error: {
                validationErrors: validationResponse.validationErrors
            }
        });
    }

    // hash password
    requestBody.password = bcrypt.hashSync(requestBody.password, 8);

    // save user
    userModel.createUser(requestBody).then(user => {
        return res.status(200).json({
            status: true,
            message: 'registered succesffully',
            data: {
                user
            }
        });
    }).catch(error => {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error
        });
    })
}

// login user
const signin = async (req, res) => {
    let requestBody = req.body;

    // validate user data
    const validationResponse = await userValidation.validateUserSignin(requestBody);
    if (!validationResponse.valid) {
        return res.status(200).json({
            status: false,
            message: 'validation error',
            error: {
                validationErrors: validationResponse.validationErrors
            }
        });
    }
    try {
        // get user
        const user = await userModel.findUserByEmail(requestBody.email);
        if (!user) {
            return res.status(200).json({
                status: false,
                message: 'Auth Failed!',
                error: {
                    validationErrors: {
                        email: 'Seems not registered email!'
                    }
                }
            });
        }

        // compare password
        const comparisonResult = await bcrypt.compare(requestBody.password, user.password);
        if (!comparisonResult) {
            return res.status(200).json({
                status: false,
                message: 'Auth Failed!',
                error: {
                    validationErrors: {
                        password: 'wrong password!'
                    }
                }
            });
        }

        // create JWT
        let token = jwt.sign({
                email: user.email,
                userId: user._id
            },
            process.env.JWT_KEY, {
                expiresIn: "2h"
            });

        // return authentication pass return
        res.status(200).json({
            status: true,
            message: 'Authenticated!',
            data: {
                token,
                user
            }
        });

    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error!',
        });
    }
}

const attachNewsSource = async (req, res) => {
    let requestBody = req.body;
console.log(requestBody)
    // validate user data
    const validationResponse = await userValidation.validateAttachNewsSource(requestBody);
    if (!validationResponse.valid) {
        return res.status(200).json({
            status: false,
            message: 'validation error',
            error: {
                validationErrors: validationResponse.validationErrors
            }
        });
    }
    let user = null;
    try {
        if (Number(requestBody.attach) === 1) {
            user = await userModel.attachSourceToUser(requestBody);
        }

        if (Number(requestBody.attach) === 0) {
            user = await userModel.dettachSourceToUser(requestBody);
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error!',
        });
    }

    if (!user) {
        console.log(user)
    }

    return res.status(200).json({
        status: true,
        data: {
            source: requestBody.source,
            attach: requestBody.attach
        },
        message: 'The News sources have been updated sucessfully!',
    });

}


module.exports.signup = signup;
module.exports.signin = signin;
module.exports.attachNewsSource = attachNewsSource;