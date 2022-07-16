const { model, Schema } = require('mongoose')

const resetToken = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    expiresAt: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }) 

module.exports = model('ResetToken', resetToken)