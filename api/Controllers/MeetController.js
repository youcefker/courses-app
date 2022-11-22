const { validationResult } = require("express-validator")
const { getCourse } = require("../Services/CourseServices")
const { createMeet, filterMeets, getMeet, updateMeet, deleteMeet } = require("../Services/MeetServices")

module.exports = {
    createMeet: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const { title, date, students, course_id } = req.body
        getCourse(course_id, (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
                return res.status(404).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            const formatted_date =  new Date(date)
            const data = {
                title,
                date: formatted_date, 
                students,
                course: course._id,
            }
            createMeet(data, async(err, meet) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                } 
                meet.joins = {}
                try {
                    await meet.markModified("joins")
                    await meet.save()
                } catch(err) {
                    console.log(err)
                }
                return res.status(201).json({
                    error: false,
                    message: "Meet created succesfully",
                    data: meet
                })
            })
        })
    }, 
    filterMeets: (req, res) => {
        const filters = {}
        filterMeets(filters, (err, meets) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Meets fetched succesfully",
                data: meets
            })
        })
    },
    getMeet: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const meet_id = req.params.meet_id
        getMeet(meet_id, (err, meet) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!meet) {
                return res.status(404).json({
                    error: true,
                    message: "Meet not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Meet fetched succesfully",
                data: meet
            })
        })
    }, 
    updateMeet: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const { title, date, students } = req.body
        const meet_id = req.params.meet_id
        let formatted_date
        if(date){
            formatted_date = new Date(date)
        }
        const data = {
            title,
            date: formatted_date, 
            students
        }
        updateMeet(meet_id, data, (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!result) {
                return res.status(404).json({
                    error: true,
                    message: "Meet not found!",
                    data: null
                })
            }
            getMeet(meet_id, (err, meet) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if (!meet) {
                    return res.status(404).json({
                        error: true,
                        message: "Meet not found!",
                        data: null
                    })
                }
                return res.status(200).json({
                    error: false,
                    message: "Meet updated succesfully",
                    data: meet
                })
            })
        }) 
    },
    deleteMeet: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const meet_id = req.params.meet_id
        deleteMeet(meet_id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
            if (!result) {
                return res.status(404).json({
                    error: true,
                    message: "Meet not found!",
                })
            }
            return res.status(200).json({
                error: false,
                message: "Meet deleted succesfully",
            })
        }) 
    },
    joinMeet: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
            })
        }
        const meet_id = req.params.meet_id
        const student_id = req.decoded.student_id
        console.log(student_id)
        getMeet(meet_id, async (err, meet) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
            if (!meet) {
                return res.status(404).json({
                    error: true,
                    message: "Meet not found!",
                })
            }
            if(!meet.students.includes(student_id)){
                return res.status(401).json({
                    error: true,
                    message: "Access Denied!",
                });
            }
            if(meet.joins[student_id]){
                if(meet.joins[student_id].joined){
                    return res.status(401).json({
                        error: true,
                        message: "Access Denied!",
                    });
                } else {
                    console.log("meet join created")
                    meet.joins[student_id] = {
                        joined: true
                    }
                }
            } else {
                meet.joins[student_id] = {
                    joined: true
                }
            }
            
            try {
                await meet.markModified("joins")
                const result = await meet.save()
                return res.status(200).json({
                    error: false,
                    message: "Student joined meet succesfully",
                    data: result
                }) 
            } catch(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
        })
    },
    cancelMeet: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
            })
        }
        const meet_id = req.params.meet_id
        const student_id = req.decoded.id
        getMeet(meet_id, async (err, meet) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
            if(!meet) {
                return res.status(404).json({
                    error: true,
                    message: "Meet not found!",
                    data: null
                })
            }
            meet.joins[student_id].joined = false
            try {
                await meet.markModified("joins")
                await meet.save()
                return res.status(200).json({
                    error: false,
                    message: "Student cancelled meet succesfully"
                }) 
            } catch(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
        })
    },
    getStudentMeetings: (req, res) => {
        const student_id = req.decoded.student_id
        console.log(student_id)
        filterMeets({}, (err, meetings) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                })
            }
            const studentMeetings = meetings.filter(meet => {
                return meet.students.includes(student_id)
            })
            return res.status(200).json({
                error: false,
                message: "Student cancelled meet succesfully",
                meetings: studentMeetings
            })
        } ) 
    }
}