const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel