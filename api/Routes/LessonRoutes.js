const {  checkStudentToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons, completeLesson } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.get("/",  getAllLessons)
router.get("/course/:course_id", getCourseLessons)
router.get("/:lesson_id", getLesson)
router.put("/:lesson_id", updateLesson)
router.delete("/:lesson_id",  deleteLesson)
router.post("/complete", completeLesson)
module.exports = router