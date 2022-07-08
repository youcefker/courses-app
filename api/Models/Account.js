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
    role: {
        type: String, 
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    }
}) 

module.exports = model('Account', accountSchema)