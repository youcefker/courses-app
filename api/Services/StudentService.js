const Student = require("../Models/Student")

module.exports = {
    createStudent: async (data, callBack) => {
        console.log(data)
        try {
            const doc = await Student.create(data)
            return callBack(false, doc)
        } catch(err) {
            console.log(err)
            return callBack(true)
        }
    },
    getStudent: async (id, callBack) => {
        try {
            const doc = await Student.findById(id)
            return callBack(false, doc)
        } catch(err) {
            console.log(err)
            return callBack(true)
        }
    }, 
    getStudentByName: async (name, callBack) => {
        try {
            const doc = await Student.findOne({ name })
            return callBack(false, doc)
        } catch(err){
            console.log(err)
            return callBack(true)
        }
    },
    getStudents: async(callBack) => {
        try {
            const docs = await Student.find()
            return callBack(false, docs)
        } catch(err){
            console.log(err)
            return callBack(true)
        }
    }
}