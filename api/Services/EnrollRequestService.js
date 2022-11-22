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
    getEnrollRequests: async (filters, callBack) => {
        try {
            const doc = await EnrollRequest.find(filters)
            return callBack(false, doc)
        } catch(err) {
            console.log(err)
            return callBack(true)
        }
    },
    deleteEnrollRequest: async(id, callBack) => {
        try {
            const result = await EnrollRequest.findByIdAndDelete(id)
            return callBack(false, result)
        } catch(err) {
            console.log(err)
            return callBack(true)
        }
    }
}