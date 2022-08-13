const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons, getCourseStudents, getCoursesNames, deleteStudentFromCourse } = require('../Controllers/CourseControllers')

const router = require('express').Router()

const multer = require('multer');
const path = require("path");
const { checkAdminToken, checkStudentToken } = require('../Auth');
const { deleteLesson } = require('../Services/CourseServices');
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
router.get('/',  checkAdminToken, getAllCourses)
router.get('/names', getCoursesNames)
router.get('/:course_id',  checkStudentToken, getCourse)
router.put('/:course_id',  checkAdminToken, updateCourse)
router.delete('/:course_id', checkAdminToken, deleteCourse)
router.delete('/:lesson_id', checkAdminToken, deleteLesson)
router.get("/students/:name",  checkAdminToken, getCourseStudents)
router.delete("/:course_id/student/:student_id", checkAdminToken, deleteStudentFromCourse)

module.exports = router