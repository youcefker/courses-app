const {  checkStudentToken, checkAdminToken, checkToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons, completeLesson, addLessonToCourse, getLessonFile } = require("../Controllers/CourseControllers")
const multer = require('multer');

const router = require("express").Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'lessons/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + ".mp4")
    },
})
const upload = multer({
    storage
}).single("lesson_file");

router.get("/",  checkAdminToken, getAllLessons)
router.get("/course/:course_id", checkToken, getCourseLessons)
router.post('/course/:course_id', checkAdminToken, upload, addLessonToCourse)
router.get("/:lesson_id", checkStudentToken, getLesson)
router.put("/:lesson_id", checkAdminToken, updateLesson)
router.delete("/:lesson_id", checkAdminToken, deleteLesson)
router.post("/complete", checkStudentToken, completeLesson)
router.get("/file/:lesson_id", getLessonFile )
module.exports = router