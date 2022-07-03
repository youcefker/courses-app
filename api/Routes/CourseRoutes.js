const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents } = require('../Controllers/CourseControllers')

const router = require('express').Router()

const multer = require('multer');
const path = require("path");
const { checkAdminToken } = require('../Auth');
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
router.post('/', checkAdminToken, upload, createCourse)
router.get('/', checkAdminToken, getAllCourses)
router.get('/:course_id', getCourse)
router.put('/:course_id',checkAdminToken, updateCourse)
router.delete('/:course_id',checkAdminToken, deleteCourse)
router.get("/students/:name",checkAdminToken, getCourseStudents)

module.exports = router