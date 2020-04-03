const mongoose = require('mongoose');
const User = require('../../database/Schema/user');

// connect to mongoDB
require('../../database/mongoDBConnect');

const createUser = async requestBody => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: requestBody.fullName,
        email: requestBody.email,
        password: requestBody.password,
        subscribedSources: []
    });

    return await user.save();
}

const findUser = async _id => {
    const user = User.findOne({
        _id: new mongoose.Types.ObjectId(_id)
    });
    return await user.exec();
}

const findUserByEmail = async email => {
    const user = User.findOne({
        email
    });
    return await user.select('_id fullName email password subscribedSources').exec();
}

const isUsedEmail = async email => {
    const user = User.findOne({
        email
    });
    return await user.select('_id').exec();
}

const attachSourceToUser = async userData => {
    return await User.updateOne({
        _id: new mongoose.Types.ObjectId(userData.id)
    }, {
        $push: {
            subscribedSources: userData.source
        }
    });
}

const dettachSourceToUser = async userData => {
    return await User.updateOne({
        _id: new mongoose.Types.ObjectId(userData.id)
    }, {
        $pull: {
            subscribedSources: userData.source
        }
    });
}

module.exports.createUser = createUser
module.exports.findUser = findUser
module.exports.findUserByEmail = findUserByEmail
module.exports.isUsedEmail = isUsedEmail
module.exports.attachSourceToUser = attachSourceToUser
module.exports.dettachSourceToUser = dettachSourceToUser