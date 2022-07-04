const { checkAdminToken, checkStudentToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.get("/", getAllLessons)
router.get("/course/:course_id", getCourseLessons)
router.get("/:lesson_id", getLesson)
router.put("/:lesson_id", updateLesson)
router.delete("/:lesson_id", deleteLesson)
module.exports = router