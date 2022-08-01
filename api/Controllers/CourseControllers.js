const { createCourse, createLesson, getCourse, getAllCourses, updateCourse, deleteCourse, getLesson, getAllLessons, updateLesson, deleteLesson, getCourseLessons, getCourseByName } = require("../Services/CourseServices")
const { getStudent } = require("../Services/StudentService")

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
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false, 
                message: "Course created succesfully",
                data: course
            })
        })
    },
    getAllCourses: async (req, res) => {
        getAllCourses(async (err, courses) => {
            if(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(courses.length === 0) {
                return res.status(200).json({
                    error: false,
                    message: "No courses found!",
                    data: courses
                })
            }
            return res.status(200).json({
                error: false, 
                message: "Courses fetched succesfully",
                data: courses
            })
        })
    },
    getCourse: async (req, res) => {
        const course_id = req.params.course_id
        getCourse(course_id, async (err, course) => {
            if(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(!course){
                return res.status(200).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            try {
                const courseWithLessons = await course.populate("lessons")
                return res.status(200).json({
                    error: false, 
                    message: "Course fetched succesfully",
                    data: courseWithLessons
                })
            } catch(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    },
    getCourseStudents: async (req, res) => {
        getCourseByName(req.params.name, async (err, course) => {
            if(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!course){
                return res.status(400).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            try {
                const courseWithStudents = await course.populate("students")
                return res.status(200).json({
                    error: false, 
                    message: "Course students fetched succesfully",
                    data: courseWithStudents.students
                })
            } catch(error){
                console.log(err)
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
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
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
            getCourse(course.id, (err, updatedCourse) => {
                if(err){
                    return res.status(400).json({
                        error: true, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                return res.status(200).json({
                    error: false, 
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
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Course deleted succesfully",
                data: null
            })
        })
    },
    addLessonToCourse : async (req, res) => {
        console.log(req.file)
        if(!req.params.course_id) {
            return res.status(400).json({
                error: true,
                message: "you need to specify the course.",
                data: null
            })
        }
        getCourse(req.params.course_id, async (err, course) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                }) 
            }
            if(!course) {
                return res.status(400).json({
                    error: true,
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
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    }) 
                }
                try {
                    course.lessons = [ ...course.lessons, lesson.id ]
                    await course.save()
                    return res.status(200).json({
                        error: false,
                        message: "Lesson created succesfully",
                        data: lesson
                    })
                } catch(err) {
                    console.log(err)
                    return res.status(400).json({
                        error: true, 
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
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(lessons.length === 0) {
                return res.status(200).json({
                    error: false, 
                    message: "No lessons found!",
                    data: lessons
                })
            }
            return res.status(200).json({
                error: false,
                message: "Lessons fetched succesfully",
                data: lessons
            })
        })
    },
    getCourseLessons: async (req, res) => {
        const course_id = req.params.course_id
        getCourse(course_id, async(err, course) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(!course){
                return res.status(400).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            try {
                const courseWithLessons = await course.populate("lessons")
                return res.status(200).json({
                    error: false,
                    message: "Course Lessons fetched succesfully",
                    data: courseWithLessons.lessons
                })
            } catch(error){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    },
    getLesson: async (req, res) => {
        const lesson_id = req.params.lesson_id
        getLesson(lesson_id, async (err, lesson) => {
            if(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            } 
            if(!lesson){
                return res.status(400).json({
                    error: true,
                    message: "Lesson not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false, 
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
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            getLesson(lesson.id, (err, updatedlesson) => {
                if(err){
                    return res.status(400).json({
                        error: true, 
                        message: "something went wrong!",
                        data: null
                    })
                }
                return res.status(200).json({
                    error: false, 
                    message: "lesson updated succesfully",
                    data: updatedlesson
                })
            })
        })
    },
    completeLesson: async (req, res) => {
        console.log(req.body.student_id)
        getStudent(req.body.student_id, async (err, student) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student){
                return res.status(400).json({
                    error: true, 
                    message: "Lesson not found!",
                    data: null
                })
            }
            let course_progress_index, lesson_progress_index
            const course_progress = student.progress.map((course, index) => {
                if(course.course_id.toString() === req.body.course_id){
                    course_progress_index = index
                    return course
                }
            })[0]
            const lesson_progress = course_progress.lessons_progress.map((lesson, index) => {
                if(lesson.lesson_id.toString() === req.body.lesson_id){
                    lesson_progress_index = index
                    return lesson
                }
            })[0]
            student.progress[course_progress_index].lessons_progress[lesson_progress_index].completed = true
            console.log(student.progress[course_progress_index].lessons_progress[lesson_progress_index])
            try {
                await student.save()
                return res.status(200).json({
                    error: false, 
                    message: "Course progress",
                    data: student 
                })
            } catch(err) {
                return res.status(400).json({
                    error: true, 
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    },
    deleteLesson: async (req, res) => {
        const lesson_id = req.params.lesson_id
        deleteLesson(lesson_id, (err, result) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!result){
                return res.status(400).json({
                    error: true,
                    message: "lesson not found",
                    data: null
                })
            }
            return res.status(200).json({
                error: false, 
                message: "Lesson deleted succesfully",
                data: null
            })
        })
    },
    getCoursesNames : async (req, res) => {
        getAllCourses((err, courses) => {
            if(err){
                console.log(err)
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(courses.length === 0) {
                return res.status(200).json({
                    error: false, 
                    message: "No courses found",
                    data: courses
                })
            }
            const coursesNames = courses.map(course => {
                console.log(course)
                return {
                    _id: course.id.toString(),
                    name: course.name
                }
            })
            console.log(coursesNames)
            return res.status(200).json({
                error: false,
                message: "Courses names fetched succesfully",
                data: coursesNames
            })
        })
    }
}