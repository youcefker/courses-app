const { checkAdminToken, checkStudentToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.get("/", checkAdminToken, getAllLessons)
router.get("/course/:course_id",checkStudentToken, getCourseLessons)
router.get("/:lesson_id",checkStudentToken, getLesson)
router.put("/:lesson_id", checkAdminToken, updateLesson)
router.delete("/:lesson_id", checkAdminToken, deleteLesson)
module.exports = router