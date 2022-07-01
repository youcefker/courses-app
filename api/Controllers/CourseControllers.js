const { createCourse, createLesson, getCourse, getAllCourses, updateCourse, deleteCourse, getLesson, getAllLessons, updateLesson, deleteLesson, getCourseLessons } = require("../Services/CourseServices")

module.exports = {
    createCourse : async (req, res) => {
        
        const course = {
            name: req.body.name,
            description: req.body.description,
            filename: req.file ? req.file.filename : null
        }
        createCourse(course, (err, result) => {
            if(err) {
                console.log("err")
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Course created succesfully",
                data: course
            })
        })
    },
    getAllCourses: async (req, res) => {
        getAllCourses(async (err, courses) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(courses.length === 0) {
                return res.json({
                    error: false,
                    status: 200, 
                    message: "No courses found!",
                    data: courses
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Courses fetched succesfully",
                data: courses
            })
        })
    },
    getCourse: async (req, res) => {
        const course_id = req.params.course_id
        getCourse(course_id, async (err, course) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(!course){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "Course not found!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Course fetched succesfully",
                data: course
            })
        })
    },
    updateCourse : async (req, res) => {
        const course_id = req.params.course_id
        const updateData = {
            name: req.body.name,
            description: req.body.description
        }
        updateCourse(course_id, updateData, async (err, course) => {
            if(err){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            getCourse(course.id, (err, updatedCourse) => {
                if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                return res.json({
                    error: false,
                    status: 200, 
                    message: "Course updated succesfully",
                    data: updatedCourse
                })
            })
        })
    },
    deleteCourse: async (req, res) => {
        const course_id = req.params.course_id
        deleteCourse(course_id, (err, result) => {
            if(err){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Course deleted succesfully",
                data: null
            })
        })
    },
    addLessonToCourse : async (req, res) => {
        console.log(req.file)
        //const filename = req.file.filename
        if(!req.params.course_id) {
            return res.json({
                error: true,
                status: 401, 
                message: "you need to specify the course.",
                data: null
            })
        }
        getCourse(req.params.course_id, async (err, course) => {
            if(err){
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
                    message: "Course not found!",
                    data: null
                })
            }
            const lesson = {
                name: req.body.name,
                description: req.body.description,
                filename: req.file ? req.file.filename: null,
                course_id: course.id
            }
            createLesson(lesson, async (err, lesson) => {
                if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    }) 
                }
                try {
                    course.lessons = [ ...course.lessons, lesson.id ]
                    await course.save()
                    return res.json({
                        error: false,
                        status: 200, 
                        message: "Lesson created succesfully",
                        data: lesson
                    })
                } catch(err) {
                    console.log(err)
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
            })
        })
    },
    getAllLessons: async (req, res) => {
        console.log("hello")
        getAllLessons(async (err, lessons) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(lessons.length === 0) {
                return res.json({
                    error: false,
                    status: 200, 
                    message: "No lessons found!",
                    data: lessons
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Lessons fetched succesfully",
                data: lessons
            })
        })
    },
    getCourseLessons: async (req, res) => {
        const course_id = req.params.course_id
        getCourseLessons(course_id, async (err, lessons) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(lessons.length === 0){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "course does not contain any lesson yet.",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Lessons fetched succesfully",
                data: lessons
            })
        })
    },
    getLesson: async (req, res) => {
        const lesson_id = req.params.lesson_id
        getLesson(lesson_id, async (err, lesson) => {
            if(err) {
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(!lesson){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "Lesson not found!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Lesson fetched succesfully",
                data: lesson
            })
        })
    },
    updateLesson : async (req, res) => {
        const lesson_id = req.params.lesson_id
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            filename: req.file ? req.file.filename : null
        }
        updateLesson(lesson_id, updateData, async (err, lesson) => {
            if(err){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            getLesson(lesson.id, (err, updatedlesson) => {
                if(err){
                    return res.json({
                        error: true,
                        status: 401, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                return res.json({
                    error: false,
                    status: 200, 
                    message: "lesson updated succesfully",
                    data: updatedlesson
                })
            })
        })
    },
    deleteLesson: async (req, res) => {
        const lesson_id = req.params.lesson_id
        deleteLesson(lesson_id, (err, result) => {
            if(err){
                return res.json({
                    error: true,
                    status: 401, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.json({
                error: false,
                status: 200, 
                message: "Lesson deleted succesfully",
                data: null
            })
        })
    },
}