const { createCourse, createLesson, getCourse, getAllCourses, updateCourse, deleteCourse, getLesson, getAllLessons, updateLesson, deleteLesson, getCourseLessons, getCourseByName, createChapter, updateChapter, getChapter, deleteChapter, filterCourses } = require("../Services/CourseServices")
const { getStudent } = require("../Services/StudentService")
const fs = require("fs")
const { validationResult, body } = require("express-validator")

module.exports = {
    createCourse : async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const course = {
            name: req.body.name,
            description: req.body.description,
            teacher_name: req.body.teacher_name,
            filename: req.file?.filename
        }
        createCourse(course, (err, result) => {
            if(err) {
                console.log("err")
                return res.status(400).json({
                    error: true, 
                    message: "course name exists.",
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
    filterCourses: async (req, res) => {
        let filters = {}
        if(req.query.name){
            filters.name = {
               $regex: req.query.name
            }
        }
        if(req.query.isActive){
            filters.isActive = {
                $eq: req.query.isActive
            }
        }
        filterCourses(filters,async (err, courses) => {
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
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
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
        const result = validationResult(req)
        if(!result.isEmpty()){
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
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
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
    addChapterToCourse: async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        getCourse(req.params.course_id, (err, course) => {
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
            console.log("course id", req.params.course_id)
            const data = {
                title: req.body.title,
                course_id: req.params.course_id
            }
            createChapter(data, async (err, chapter) => {
                if(err){
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
    updateChapter: (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
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
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                }) 
            }
            getChapter(chapter_id, (err, chapter) => {
                if(err){
                    return res.status(400).json({
                        error: true,
                        message: "something went wrong!",
                        data: null
                    }) 
                }
                if(!chapter) {
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
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const chapter_id = req.params.chapter_id
        deleteChapter(chapter_id, (err, result) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                }) 
            }
            if(!result) {
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
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const file = req.file
        if(!file){
            return res.status(400).json({
                error: true,
                message: "lesson file should not be empty!",
                data: null
            })
        }
        getChapter(req.params.chapter_id, async (err, chapter) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                }) 
            }
            if(!chapter) {
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
                chapter_id: chapter.id
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
                    chapter.lessons = [ ...chapter.lessons, lesson.id ]
                    await chapter.save()
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
    getCourseChaptersWithLessons: async (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
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
                    message: "chapter not found!",
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
                return res.status(200).json({
                    error: false,
                    message: "chapter Lessons fetched succesfully",
                    data: courseWithChapters.chapters
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
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
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
        const result = validationResult(req)
        if(!result.isEmpty()){
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
                    message: "Lesson completed",
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
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const lesson_id = req.params.lesson_id
        getLesson(lesson_id, (err, lesson) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!lesson){
                return res.status(400).json({
                    error: true,
                    message: "lesson not found",
                    data: null
                })
            }
            deleteLesson(lesson_id, async (err, result) => {
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
                getCourse(lesson.course_id, async(err, course) => {
                    if(err){
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                    if(!course){
                        return res.status(400).json({
                            error: true,
                            message: "lesson course not found",
                            data: null
                        })
                    }
                    try {
                        const updatedCourseLessons = course.lessons.filter(id => course.id !== id.toString())
                        console.log("updated", updatedCourseLessons)
                        course.lessons = updatedCourseLessons
                        await course.save()
                        return res.status(200).json({
                            error: false, 
                            message: "Lesson deleted succesfully",
                            data: null
                        })
                    } catch(err){
                        console.log(err)
                        return res.status(400).json({
                            error: true,
                            message: "something went wrong!",
                            data: null
                        })
                    }
                })
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
    },
    getLessonFile : (req, res) => {
        const lesson_id = req.params.lesson_id
        console.log("lesson id", lesson_id)
        getLesson(lesson_id, (err, lesson) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!lesson){
                return res.status(404).json({
                    error: true,
                    message: "lesson not found.",
                    data: null
                })
            }
            const path = `lessons/${lesson.filename}`
            const stat = fs.statSync(path)
            const fileSize = stat.size
            const range = req.headers.range
            if(range){
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(path, {start, end});
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
                fs.createReadStream(path).pipe(res);
            }
        })
    },
    deleteStudentFromCourse : (req, res) => {
        const result = validationResult(req)
        if(!result.isEmpty()){
            return res.status(400).json({
                error: true, 
                message: result.errors[0].msg,
                data: null
            }) 
        }
        const { student_id, course_id } = req.params
        console.log(student_id, course_id)
        getStudent(student_id, (err, student) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "something went wrong!",
                    data: null
                })
            }
            if(!student){
                return res.status(404).json({
                    error: true,
                    message: "student not found.",
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
                if(!course){
                    return res.status(404).json({
                        error: true,
                        message: "course not found.",
                        data: null
                    })
                }
                try {
                    const updatedStudentCourses = student.courses.filter(id => course.id !== id.toString())
                    student.courses = updatedStudentCourses
                    const updatedStudentProgress = student.progress.filter(courseProgress => course.id != courseProgress.course_id.toString() )
                    student.progress = updatedStudentProgress
                    const updatedCourseStudents = course.students.filter(id => student.id != id.toString())
                    course.students = updatedCourseStudents
                    await student.save()
                    await course.save()
                    return res.status(200).json({
                        error: false,
                        message: "Student deleted from course succesfully",
                        data: null
                    })
                } catch(error){
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