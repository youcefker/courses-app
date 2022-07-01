const { addCourseToStudent, getStudents } = require("../Controllers/StudentControllers")

const router = require("express").Router()

router.post("/addcourse", addCourseToStudent)

router.get("/", getStudents)
module.exports = router