const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents, getCoursesNames } = require('../Controllers/CourseControllers')

const router = require('express').Router()

const multer = require('multer');
const path = require("path");
const { } = require('../Auth');
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
router.post('/',  upload, createCourse)
router.get('/',  getAllCourses)
router.get('/names', getCoursesNames)
<<<<<<< HEAD
router.get('/:course_id',  getCourse)
router.put('/:course_id',  updateCourse)
=======
router.get('/:course_id', getCourse)
router.put('/:course_id', updateCourse)
>>>>>>> 269658785727881df3ab2b54911803adc9794d4b
router.delete('/:course_id',  deleteCourse)
router.get("/students/:name",  getCourseStudents)

module.exports = router