const Meet = require("../Models/Meet")
module.exports = {
    createMeet: async (data, callBack) => {
        try {
            const doc = await Meet.create(data)
            return callBack(null, doc)
        } catch(err){
            console.log(err)
            return callBack(err)
        }
    }, 
    filterMeets: async (filters, callBack) => {
        try {
            const docs = await Meet.find(filters)
            return callBack(null, docs)
        } catch(err){
            console.log(err)
            return callBack(err)
        }
    },
    getMeet: async (id, callBack) => {
        try {
            const doc = await Meet.findById(id)
            return callBack(null, doc)
        } catch(err){
            console.log(err)
            return callBack(err)
        }
    },
    updateMeet: async (id, data, callBack) => {
        try {
            const result = await Meet.findByIdAndUpdate(id, data)
            return callBack(null, result)
        } catch(err){
            console.log(err)
            return callBack(err)
        }
    },
    deleteMeet: async (id, data, callBack) => {
        try {
            const result = await Meet.findByIdAndDelete(id, data)
            return callBack(null, result)
        } catch(err){
            console.log(err)
            return callBack(err)
        }
    }
}