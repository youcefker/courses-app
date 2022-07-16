const {  checkStudentToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons, completeLesson } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.get("/",  getAllLessons)
router.get("/course/:course_id", getCourseLessons)
router.get("/:lesson_id", getLesson)
router.put("/:lesson_id", updateLesson)
router.delete("/:lesson_id",  deleteLesson)
router.post("/complete", completeLesson)
<<<<<<< HEAD

=======
>>>>>>> 269658785727881df3ab2b54911803adc9794d4b
module.exports = router