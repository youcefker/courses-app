const { getCourse } = require("../Services/CourseServices")
const { getStudent, getStudents, deleteStudent } = require("../Services/StudentService")

module.exports = {
    addCourseToStudent: async (req, res) => {
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
                const existedStudent = course.students.filter(courseStudentId => {
                    return student.id === courseStudentId.toString()
                })
                if(existedStudent.length > 0) {
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "This course is already enrolled by this student!",
                        data: null
                    })
                }
                course.students = [...course.students, student.id]
                student.courses = [ ...student.courses, course.id]
                const lessons_progress = course.lessons.map(lesson => {
                    return {
                        lesson_id: lesson, 
                        completed: false
                    }
                })
                const courseProgress = {
                    course_id: course.id,
                    lessons_progress
                }
                console.log("hello-----")
                student.progress = [ ...student.progress,  courseProgress]
                console.log(student.progress)
                try {
                    await course.save()
                    await student.save()
                    return res.json({
                        error: false,
                        status: 200, 
                        message: "course not found!",
                        data: student
                    })
                } catch(err){
                    console.log(err)
                }
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
        getStudent(req.params.student_id, async (err, student) => {
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
            try {
                const studentWithCourses = await student.populate("courses")
                return res.json({
                    error: false,
                    status: 200, 
                    message: "Student courses fetched succesfully.",
                    data: studentWithCourses
                })
            } catch(error) {
                console.log(error)
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    },
    deleteStudent: async (req, res) => {
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
    }
}