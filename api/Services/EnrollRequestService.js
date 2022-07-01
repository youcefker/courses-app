const EnrollRequest = require("../Models/EnrollRequest")

module.exports = {
    createEnrollRequest: async (data, callBack) => {
        try {
            const doc = EnrollRequest.create(data)
            return callBack(false, doc)
        } catch(err){
            console.log(err)
            return callBack(true)
        }
    },
    getEnrollRequests: async (callBack) => {
        try {
            const docs = await EnrollRequest.find()
            return callBack(false, docs)
        } catch(err) {
            return callBack(true)
        }
    }
}