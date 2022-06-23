const { createCipheriv } = require("crypto")
const Course = require("../Models/Course")
const Lesson = require("../Models/Lesson")

module.exports = {
    createCourse : async (data, callBack) => {
        try {
            const doc = await Course.create(data)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    createLesson : async (data, callBack) => {
        try {
            const doc = await Lesson.create(data)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    getAllCourses: async (callBack) => {
        try {
            const doc = await Course.find()
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    getAllLessons: async (callBack) => {
        try {
            const doc = await Lesson.find()
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    getCourse: async (id, callBack) => {
        try {
            const doc = await Course.findById(id)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    getLesson: async (id, callBack) => {
        try {
            const doc = await Lesson.findById(id)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    updateCourse: async (id, data, callBack) => {
        try {
            const doc = await Course.findByIdAndUpdate(id, data)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    updateLesson: async (id, data, callBack) => {
        try {
            const doc = await Lesson.findByIdAndUpdate(id, data)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    deleteCourse: async (id, callBack) => {
        try {
            const doc = await Course.findByIdAndRemove(id)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    },
    deleteLesson: async (id, callBack) => {
        try {
            const doc = await Lesson.findByIdAndRemove(id)
            return callBack(false, doc)
        } catch(err) {
            return(true)
        }
    }
}