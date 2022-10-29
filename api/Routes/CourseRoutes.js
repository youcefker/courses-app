const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents, getCoursesNames, deleteStudentFromCourse, filterCourses, deleteChapter } = require('../Controllers/CourseControllers')

const router = require('express').Router()

const multer = require('multer');
const path = require("path");
const { checkAdminToken, checkStudentToken } = require('../Auth');
const { deleteLesson } = require('../Services/CourseServices');
const { checkSchema, param } = require('express-validator');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + ".png")
    },
})
const upload = multer({
    storage
}).single("course_file");

// course routes
router.post('/', checkAdminToken, upload, checkSchema({
    name: {
        isLength: {
            errorMessage: "course name should not be empty.",
            options: {
                min: 1
            }
        }
    },
    teacher_name: {
        isLength: {
            errorMessage: "course teacher name should not be empty.",
            options: {
                min: 1
            }
        }
    },
}), createCourse)
router.get('/', checkAdminToken, filterCourses)
router.get('/names', getCoursesNames)
router.get('/:course_id', checkStudentToken, getCourse)
router.put('/:course_id', checkAdminToken, upload, checkSchema({
    name: {
        optional: true,
        isLength: {
            errorMessage: "course name should not be empty.",
            options: {
                min: 1
            }
        }
    },
    description: {
        optional: true,
        isLength: {
            errorMessage: "course description should not be empty.",
            options: {
                min: 1
            }
        }
    },
    teacher_name: {
        optional: true,
        isLength: {
            errorMessage: "course teacher name should not be empty.",
            options: {
                min: 1
            }
        }
    },
}), updateCourse)
router.delete('/:course_id', checkAdminToken, param("course_id", "invalid course id.").isMongoId(), deleteCourse)
<<<<<<< HEAD
router.get("/students/:name",  checkAdminToken, getCourseStudents)
router.delete("/:course_id/student/:student_id", checkAdminToken,param("course_id", "invalid course id.").isMongoId(), param("student_id", "invalid student id.").isMongoId(), deleteStudentFromCourse)
=======
router.delete('/:lesson_id', checkAdminToken, param("lesson_id", "invalid lesson id.").isMongoId(), deleteLesson)
router.get("/students/:name", checkAdminToken, getCourseStudents)
router.delete("/:course_id/student/:student_id", checkAdminToken, param("course_id", "invalid course id.").isMongoId(), param("student_id", "invalid student id.").isMongoId(), deleteStudentFromCourse)
>>>>>>> f8e4333d0bdc1a9fb6c9e79cce3592a6a0c28e23

module.exports = router