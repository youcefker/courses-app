const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents, getCoursesNames } = require('../Controllers/CourseControllers')

const router = require('express').Router()

const multer = require('multer');
const path = require("path");
const { checkAdminToken, checkStudentToken } = require('../Auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + ".mp4")
    },
})
const upload = multer({
    storage
}).single("lesson_file");

// course routes
router.post('/', checkAdminToken, upload, createCourse)
router.post('/:course_id/lesson', checkAdminToken, upload, addLessonToCourse)
router.get('/',  checkAdminToken, getAllCourses)
router.get('/names', getCoursesNames)
router.get('/:course_id',  checkStudentToken, getCourse)
router.put('/:course_id',  checkAdminToken, updateCourse)
router.delete('/:course_id', checkAdminToken, deleteCourse)
router.get("/students/:name",  checkAdminToken, getCourseStudents)

module.exports = router