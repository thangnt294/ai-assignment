const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    userType: {type: String, required: true},
    weight: {type: Number, required: false},
    deleted: {type: Boolean, required: false},
    createdDate: {type: Number, required: true, default: Date.now()},
    updatedDate: {type: Number, required: true, default: Date.now()},
})

const User = mongoose.model('User', userSchema)

module.exports = User