const ConfirmationToken = require("../Models/ConfirmationToken")

module.exports = {
    createConfirmationToken: async (data, callback) => {
        try {
            const doc = await ConfirmationToken.create(data)
            return callback(false, doc)
        } catch(err){
            console.log(err)
            return callback(true)
        }
    },

    getConfirmationToken:  async (token, callback) => {
        try {
            const doc = await ConfirmationToken.findOne({ token })
            return callback(false, doc)
        } catch(err){
            return callback(true)
        }
    }
}