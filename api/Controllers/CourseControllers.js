const { createCourse, createLesson, getCourse, getAllCourses, updateCourse, deleteCourse, getLesson, getAllLessons, updateLesson, deleteLesson, getCourseLessons, getCourseByName, createChapter, updateChapter, getChapter, deleteChapter, filterCourses } = require("../Services/CourseServices")
const { getStudent } = require("../Services/StudentService")
const fs = require("fs")
const { validationResult, body } = require("express-validator")
const { getEnrollRequests } = require("../Services/EnrollRequestService")
const jwt = require('jsonwebtoken');
const { getAccount } = require("../Services/AccountService");
const { calculateStudentProgress } = require("../utils/functions")
const path = require("path")
module.exports = {
    createCourse: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const data = {
            name: req.body.name,
            description: req.body.description,
            teacher_name: req.body.teacher_name,
            filename: req.file?.filename
        }
        createCourse(data, (err, course) => {
            if (err) {
                console.log("err")
                return res.status(400).json({
                    error: true,
                    message: "course name exists.",
                    data: null
                })
            }
            return res.status(201).json({
                error: false,
                message: "Course created succesfully",
                data: course
            })
        })
    },
    filterCourses: async (req, res) => {
        let filters = {}
        if (req.query.name) {
            filters.name = {
                $regex: req.query.name
            }
        }
        if (req.query.isActive) {
            filters.isActive = {
                $eq: req.query.isActive
            }
        }
        filterCourses(filters, async (err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (courses.length === 0) {
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
    filterCoursesForStudent: (req, res) => {
        const student_id = req.decoded.student_id
        getStudent(student_id, async (err, student) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            let filters = {
                isActive : {
                    $eq: true
                }
            }
            if (req.query.name) {
                filters.name = {
                    $regex: req.query.name
                }
            }
            filterCourses(filters, (err, courses) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                console.log("student courses", student.courses)
                const enrolledCourses = courses.filter(course => {
                    return student.courses.includes(course._id)
                })
                const notEnrolledCourses = courses.filter(course => {
                    return !student.courses.includes(course._id)
                })
                enrolledCourses.map(course => {
                    course.isActive = undefined
                    course.students = undefined
                })
                notEnrolledCourses.map(course => {
                    course.isActive = undefined
                    course.students = undefined
                })
                let filters = {
                    student_id: {
                        $eq: student_id
                    }
                }
                getEnrollRequests(filters, (err, enrollRequests) => {
                    if (err) {
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    notEnrolledCourses.map((course, index) => {
                        notEnrolledCourses[index]._doc= {
                            ...notEnrolledCourses[index]._doc,
                            requested: false
                        }
                        enrollRequests.map(enrollRequest => {
                            if(enrollRequest.course_id.toString() === course._id.toString()){
                                notEnrolledCourses[index]._doc= {
                                    ...notEnrolledCourses[index]._doc,
                                    requested: true
                                }
                            }
                        })
                    })
                    return res.status(200).json({
                        error: false,
                        message: "Courses fetched succesfully",
                        data: {
                            enrolledCourses,
                            notEnrolledCourses
                        }
                    })
                })
            })
        })
    },
    getCourse: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const course_id = req.params.course_id
        getCourse(course_id, async (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
                return res.status(200).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Course fetched succesfully",
                data: course
            })
        })
    },
    getCourseStudentsByName: async (req, res) => {
        getCourseByName(req.params.name, async (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
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
            } catch (error) {
                console.log(err)
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
        })
    },
    getCourseStudents: async (req, res) => {
        const course_id = req.params.course_id
        getCourse(course_id, async (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
                return res.status(400).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            try {
                const courseWithStudents = await course.populate("students")
                await courseWithStudents.students.map((student, index) => {
                    console.log(calculateStudentProgress(student.progress)[course_id])
                    courseWithStudents.students[index]._doc = {
                        ...courseWithStudents.students[index]._doc,
                        progress: calculateStudentProgress(student.progress)[course_id]
                    }
                })
                return res.status(200).json({
                    error: false,
                    message: "Course students fetched succesfully",
                    data: courseWithStudents.students
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
    },
    updateCourse: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const course_id = req.params.course_id
        const updateData = {
            name: req.body.name,
            isActive: req.body.isActive,
            teacher_name: req.body.teacher_name,
            description: req.body.description,
            filename: req.file?.filename
        }
        updateCourse(course_id, updateData, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!result) {
                return res.status(400).json({
                    error: true,
                    message: "course not found!",
                    data: null
                })
            }
            getCourse(course_id, (err, updatedCourse) => {
                if (err) {
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
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const course_id = req.params.course_id
        deleteCourse(course_id, (err, result) => {
            if (err) {
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
    addChapterToCourse: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        getCourse(req.params.course_id, (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
                return res.status(400).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            console.log("course id", req.params.course_id)
            const data = {
                title: req.body.title,
                course_id: req.params.course_id
            }
            createChapter(data, async (err, chapter) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                try {
                    course.chapters = [...course.chapters, chapter.id]
                    const result = await course.save()
                    return res.status(201).json({
                        error: false,
                        message: "chapter added to course succesfully!",
                        data: result
                    })
                } catch (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
            })
        })
    },
    updateChapter: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const chapter_id = req.params.chapter_id
        const data = {
            name: req.body.name,
            rank: req.body.rank
        }
        updateChapter(chapter_id, data, (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            getChapter(chapter_id, (err, chapter) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if (!chapter) {
                    return res.status(400).json({
                        error: true,
                        message: "Chapter not found!",
                        data: null
                    })
                }
                return res.status(200).json({
                    error: true,
                    message: "Chapter updated succesfully",
                    data: null
                })
            })
        })
    },
    deleteChapter: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const chapter_id = req.params.chapter_id
        deleteChapter(chapter_id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!result) {
                return res.status(400).json({
                    error: true,
                    message: "Chapter not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Chapter deleted succesfully",
                data: null
            })
        })
    },
    addLessonToChapter: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const file = req.file
        if (!file) {
            return res.status(400).json({
                error: true,
                message: "lesson file should not be empty!",
                data: null
            })
        }
        getChapter(req.params.chapter_id, async (err, chapter) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!chapter) {
                return res.status(400).json({
                    error: true,
                    message: "Course not found!",
                    data: null
                })
            }
            const lesson = {
                name: req.body.name,
                description: req.body.description,
                filename: req.file ? req.file.filename : null,
                chapter_id: chapter.id,
                file_type: file.mimetype === "video/quicktime" ? "VIDEO" : "FILE"
            }
            createLesson(lesson, async (err, lesson) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                try {
                    chapter.lessons = [...chapter.lessons, lesson.id]
                    await chapter.save()
                    return res.status(200).json({
                        error: false,
                        message: "Lesson created succesfully",
                        data: lesson
                    })
                } catch (err) {
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
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (lessons.length === 0) {
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
    getCourseChaptersWithLessons: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const course_id = req.params.course_id
        const student_id = req.decoded.student_id
        getCourse(course_id, async (err, course) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!course) {
                return res.status(400).json({
                    error: true,
                    message: "chapter not found!",
                    data: null
                })
            }
            if(req.decoded.role === "student"){
                getStudent(student_id, async (err, student) => {
                    if (err) {
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    var enroll_status = false
                    if(student.courses.includes(course_id)){
                       enroll_status = true 
                    }
                    try {
                        const courseWithChapters = await course.populate({
                            path: "chapters",
                            populate: {
                                path: "lessons"
                            }
                        })
                        return res.status(200).json({
                            error: false,
                            message: "chapter Lessons fetched succesfully",
                            data: {
                                course: courseWithChapters,
                                enrolled: enroll_status
                            }
                        })
                    } catch (error) {
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                })
            } else if(req.decoded.role === "admin"){
                try {
                    const courseWithChapters = await course.populate({
                        path: "chapters",
                        populate: {
                            path: "lessons"
                        }
                    })
                    return res.status(200).json({
                        error: false,
                        message: "chapter Lessons fetched succesfully",
                        data: {
                            course: courseWithChapters,
                            enrolled: true
                        }
                    })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
            }
        })
    },
    getLesson: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const lesson_id = req.params.lesson_id
        getLesson(lesson_id, async (err, lesson) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!lesson) {
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
    updateLesson: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const lesson_id = req.params.lesson_id
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            filename: req.file?.filename
        }
        updateLesson(lesson_id, updateData, async (err, lesson) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            getLesson(lesson.id, (err, updatedlesson) => {
                if (err) {
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
        const { course_id, chapter_id, lesson_id } = req.body
        const student_id = req.decoded.student_id
        getStudent(student_id, async (err, student) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!student) {
                return res.status(400).json({
                    error: true,
                    message: "Lesson not found!",
                    data: null
                })
            }
            getCourse(course_id, async (err, course) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
                if (!course) {
                    return res.status(400).json({
                        error: true,
                        message: "Lesson not found!",
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
                    if(!student.progress[course_id]){
                        student.progress[course_id] = {}
                    }
                    if(!student.progress[course_id][chapter_id]){
                        student.progress[course_id][chapter_id] = {}
                    }
                    if(!student.progress[course_id][chapter_id][lesson_id]){
                        student.progress[course_id][chapter_id][lesson_id]= {}
                    }
                    if(!student.progress[course_id][chapter_id][lesson_id]?.completed){
                        // set lesson progress to completed
                    student.progress[course_id][chapter_id][lesson_id].completed = true
                    // check if chapter progress is completed
                    let chapter_completed = true
                    let lessonsIds = Object.keys(student.progress[course_id][chapter_id])
                    const index = lessonsIds.indexOf("completed");
        
                    lessonsIds = lessonsIds.splice(index, 1);    
                    const chapterFromCourse = courseWithChapters.chapters.filter(chapter => {
                        return chapter._id.toString() === chapter_id
                    })
                    console.log(chapterFromCourse[0])
                    chapterFromCourse[0].lessons.map(lesson => {
                        if(!student.progress[course_id][chapter_id][lesson._id]?.completed){
                            chapter_completed = false
                        }
                    })
                    student.progress[course_id][chapter_id].completed = chapter_completed
                    await student.markModified("progress")
                    await student.save()
                    return res.status(200).json({
                        error: false,
                        message: "Lesson completed",
                        data: student
                    })
                    } else {
                        return res.status(200).json({
                            error: false,
                            message: "Lesson already completed",
                            data: student
                        })
                    }
                } catch(err){
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    })
                }
            })
        })
    },
    deleteLesson: async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const lesson_id = req.params.lesson_id
        deleteLesson(lesson_id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!result) {
                return res.status(400).json({
                    error: true,
                    message: "Lesson not found!",
                    data: null
                })
            }
            return res.status(200).json({
                error: false,
                message: "Lesson deleted succesfully.",
                data: null

            })
        })
    },
    getCoursesNames: async (req, res) => {
        filterCourses({}, (err, courses) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (courses.length === 0) {
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
    },
    getLessonFile: (req, res) => {
        const lesson_id = req.params.lesson_id
        const token = req.query.token
        const course_id = req.query.course_id
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            getAccount(decoded.id, (err, account) => {
                if (err) {
                  return res.status(400).json({
                    error: true,
                    message: "Something went wrong",
                    data: null
                  });
                }
                if (!account) {
                  return res.status(400).json({
                    error: true,
                    message: "Invalid Token...",
                    data: null
                  });
                }
                if (account.role != "student" && account.role != "admin") {
                  return res.status(401).json({
                    error: true,
                    message: "Access Denied! Unauthorized User",
                    data: null
                  });
                }
                if(account.role === "student") {
                    console.log("###############", account.student_id)
                    getStudent(decoded.student_id, (err, student) => {
                        if (err) {
                            return res.status(400).json({
                              error: true,
                              message: "Something went wrong",
                              data: null
                            });
                        }
                        if(!student.courses.includes(course_id)){
                            return res.status(401).json({
                                error: true,
                                message: "Access Denied! Unauthorized User",
                                data: null
                              });
                        }

                    })
                    getLesson(lesson_id, (err, lesson) => {
                        if (err) {
                            return res.status(400).json({
                                error: true,
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        if (!lesson) {
                            return res.status(404).json({
                                error: true,
                                message: "lesson not found.",
                                data: null
                            })
                        }
                        const filePath = `lessons/${lesson.filename}`
                        console.log(path.extname(filePath) !== ".mp4")
                        if(path.extname(filePath) !== ".mp4"){
                            console.log("file not video")
                            fs.createReadStream(filePath).pipe(res);
                        } else {
                            const stat = fs.statSync(filePath)
                        const fileSize = stat.size
                        const range = req.headers.range
                        if (range) {
                            const parts = range.replace(/bytes=/, "").split("-");
                            const start = parseInt(parts[0], 10);
                            const end = parts[1]
                                ? parseInt(parts[1], 10)
                                : fileSize - 1;
                            const chunksize = (end - start) + 1;
                            const file = fs.createReadStream(filePath, { start, end });
                            const head = {
                                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunksize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(206, head);
                            file.pipe(res);
                        } else {
                            const head = {
                                'Content-Length': fileSize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(200, head);
                            fs.createReadStream(filePath).pipe(res);
                        }
                        }
                    })
                } else if (account.role === "admin"){
                    getLesson(lesson_id, (err, lesson) => {
                        if (err) {
                            return res.status(400).json({
                                error: true,
                                message: "something went wrong!",
                                data: null
                            })
                        }
                        if (!lesson) {
                            return res.status(404).json({
                                error: true,
                                message: "lesson not found.",
                                data: null
                            })
                        }
                        const filePath = `lessons/${lesson.filename}`
                        if(path.extname(filePath) !== ".mp4"){
                            console.log("file not video")
                            fs.createReadStream(filePath).pipe(res);
                        } else {
                            const stat = fs.statSync(filePath)
                        const fileSize = stat.size
                        const range = req.headers.range
                        console.log(stat)
                        if (range) {
                            const parts = range.replace(/bytes=/, "").split("-");
                            const start = parseInt(parts[0], 10);
                            const end = parts[1]
                                ? parseInt(parts[1], 10)
                                : fileSize - 1;
                            const chunksize = (end - start) + 1;
                            const file = fs.createReadStream(filePath, { start, end });
                            const head = {
                                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunksize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(206, head);
                            file.pipe(res);
                        } else {
                            const head = {
                                'Content-Length': fileSize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(200, head);
                            fs.createReadStream(filePath).pipe(res);
                        }
                        }
                    })
                }
              })
        })
    },
    deleteStudentFromCourse: (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: result.errors[0].msg,
                data: null
            })
        }
        const { student_id, course_id } = req.params
        console.log(student_id, course_id)
        getStudent(student_id, (err, student) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if (!student) {
                return res.status(404).json({
                    error: true,
                    message: "student not found.",
                    data: null
                })
            }
            console.log("before", student.courses)
            getCourse(course_id, async (err, course) => {
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
                        message: "course not found.",
                        data: null
                    })
                }
                try {
                    const updatedStudentCourses = student.courses.filter(id => course.id !== id.toString())
                    console.log(updatedStudentCourses)
                    student.courses = updatedStudentCourses
                    student.progress[course_id] = undefined
                    const updatedCourseStudents = course.students.filter(id => student.id != id.toString())
                    console.log(updatedCourseStudents)
                    course.students = updatedCourseStudents
                    await student.save()
                    await course.save()
                    console.log("after", student.courses)
                    return res.status(200).json({
                        error: false,
                        message: "Student deleted from course succesfully",
                        data: null
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
    }
}