const { model, Schema } = require('mongoose')

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String, 
        required: true
    }
}) 

module.exports = model('Account', accountSchema)