const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents, getCoursesNames, deleteStudentFromCourse, filterCourses } = require('../Controllers/CourseControllers')

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
router.get('/',  checkAdminToken, filterCourses)
router.get('/names', getCoursesNames)
router.get('/:course_id',  checkStudentToken, param("course_id", "invalid course id.").isMongoId(), getCourse)
router.put('/:course_id',  checkAdminToken, upload, param("course_id", "invalid course id.").isMongoId(), checkSchema({
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
router.delete('/:lesson_id', checkAdminToken, param("lesson_id", "invalid lesson id.").isMongoId(), deleteLesson)
router.get("/students/:name",  checkAdminToken, getCourseStudents)
router.delete("/:course_id/student/:student_id", checkAdminToken,param("course_id", "invalid course id.").isMongoId(), param("student_id", "invalid student id.").isMongoId(), deleteStudentFromCourse)

module.exports = router