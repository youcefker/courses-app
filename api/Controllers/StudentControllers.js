const { validationResult } = require("express-validator")
const { getCourse } = require("../Services/CourseServices")
const { deleteEnrollRequest, createEnrollRequest } = require("../Services/EnrollRequestService")
const { getStudent, getStudents, deleteStudent, updateStudent } = require("../Services/StudentService")

module.exports = {
    addCourseToStudent: async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        getStudent(req.body.student_id, async(err, student) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "student not found!",
                    data: null
                })
            }
            getCourse(req.body.course_id, async (err, course) => {
                if(err) {
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!course) {
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "course not found!",
                        data: null
                    })
                }
                try {
                    const courseWithChapters = await course.populate({
                        path: "chapters",
                        populate: {
                            path: "lessons"
                        }
                    })
                    if(course.students.includes(student._id)) {
                        return res.json({
                            error: true,
                            status: 401, 
                            message: "This course is already enrolled by this student!",
                            data: null
                        })
                    }
                    course.students = [...course.students, student.id]
                    student.courses = [ ...student.courses, course.id]
                    let chapters_progress = {}
                    courseWithChapters.chapters.map(chapter => {
                        chapters_progress[chapter._id] = {
                            completed: false
                        }
                        chapter.lessons.map(lesson => {
                            chapters_progress[chapter._id][lesson._id] = {
                                completed: false
                            }
                        })
                    })
                    console.log("progress", chapters_progress)
                    student.progress[course.id] = {...chapters_progress}
                    await course.save()
                    await student.markModified("progress")
                    await student.save()
                    deleteEnrollRequest(req.body.request_id, (err, result) => {
                            if(err) {
                                return res.json({
                                    error: true,
                                    status: 401, 
                                    message: "something went wrong!",
                                    data: null
                                })
                            }
                            if(!result){
                                return res.json({
                                    error: true,
                                    status: 401, 
                                    message: "request not found!",
                                    data: null
                                })
                            }
                            return res.json({
                                error: false,
                                status: 200, 
                                message: "course added succesfully!",
                                data: student
                            })
                        })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
            })
        })
    },
    deleteEnrollRequest: async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        deleteEnrollRequest(req.params.enrollRequest_id, (err, result) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!result){
                return res.status(400).json({
                    error: true,
                    message: "student request not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Student request deleted succesfully!",
                data: null
            })
        })
    },
    getStudents: async (req, res) => {
        getStudents((err, students) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(students.length === 0){
                return res.json({
                    error: false,
                    status: 200, 
                    message: "No student found!",
                    data: students
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Student fetched succesfully",
                data: students
            }) 
        })
    },
    getStudentCourses: async(req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        getStudent(req.params.student_id, async (err, student) => {
            if(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student) {
                return res.status(400).json({
                    error: true, 
                    message: "student not found!",
                    data: null
                })
            }
            try {
                const studentWithCourses = await student.populate("courses")
                return res.status(200).json({
                    error: false,
                    message: "Student courses fetched succesfully.",
                    data: studentWithCourses
                })
            } catch(error) {
                console.log(error)
            }
        })
    },
    deleteStudent: async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        deleteStudent(req.params.student_id, (err, result) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(result.deletedCount === 0){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "student not found!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Student deleted succesfully",
                data: null
            })
        })
    }, 
    updateStudent : async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        console.log(req.params.student_id)
        if(!req.body.name){
            return res.status(400).json({
                error: true,
                message: "You must provide name to update!",
                data: null
            })
        }
        const updateData = {
            name: req.body.name
        }
        updateStudent(req.params.student_id, updateData, (err, student) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student) {
                return res.status(400).json({
                    error: true,
                    message: "student not found!",
                    data: null
                })
            }
            getStudent(student._id, (err, updatedStudent) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!updatedStudent) {
                    return res.status(400).json({
                        error: true,
                        message: "student not found!",
                        data: null
                    })
                }
                return res.status(200).json({
                    error: false,
                    message: "Enroll request deleted succesfully",
                })
            })

        })
    },
    createEnrollRequest : (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const { course_id, student_id } = req.body
        const email = req.decoded.email
        getStudent(student_id, (err, student) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student) {
                return res.status(400).json({
                    error: true,
                    message: "student not found!",
                    data: null
                })
            }
            getCourse(course_id, async (err, course) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if(!course) {
                    return res.status(400).json({
                        error: true,
                        message: "course not found!",
                        data: null
                    })
                }
                const existedCourse = student.courses.filter(courseId => courseId.toString() === course.id) 
                if(existedCourse.length > 0){
                    return res.status(400).json({
                        error: true,
                        message: "course already enrolled by student!",
                        data: null
                    })
                }
                try {
                    const data = {
                        course_id, 
                        student_id,
                        course_name: course.name,
                        email,
                        student_name: student.name
                    }
                    createEnrollRequest(data, (err, enrollRequest) => {
                        if(err) {
                            return res.status(400).json({
                                error: true,
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        if(!enrollRequest) {
                            return res.status(400).json({
                                error: true,
                                message: "enroll request not found!",
                                data: null
                            })
                        }
                        return res.status(201).json({
                            error: true,
                            message: "enroll request created succesfully",
                            data: null
                        })
                    })
                } catch(err){
                    console.log(err)
                }
            })
        })
    }
}