const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.get("/", getAllLessons)
router.get("/:lesson_id", getLesson)
router.put("/:lesson_id", updateLesson)
router.delete("/:lesson_id", deleteLesson)
module.exports = router