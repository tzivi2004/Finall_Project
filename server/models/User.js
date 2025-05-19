const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
    },
    roles: {
        type: String,
        enum: ['User', 'Waiter', 'Admin'],
        default: "User",
    },

}, { timestamps: true })


module.exports = mongoose.model("User", userSchema)