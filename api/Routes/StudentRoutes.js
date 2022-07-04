const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses } = require("../Controllers/StudentControllers")

const router = require("express").Router()

router.post("/addcourse", addCourseToStudent)

router.get("/", getStudents)

router.get("/courses/:student_id", getStudentCourses)

router.delete("/:student_id", deleteStudent)
module.exports = router