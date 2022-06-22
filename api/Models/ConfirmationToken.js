const { model, Schema } = require('mongoose')

const confirmationToken = new Schema({
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

module.exports = model('ConfirmationToken', confirmationToken)