const ResetToken = require("../Models/ResetToken")

module.exports = {
    createResetToken: async (data, callBack) => {
        try {
            const doc = await ResetToken.create(data)
            return callBack(false, doc)
        } catch(err) {
            console.log(err)
            return callBack(true)
        }
    },
    getResetToken : async (token, callBack) => {
        try {
            const doc = await ResetToken.findOne({ token })
            return callBack(false, doc)
        } catch(err) {
            return callBack(true)
        }
    }
}