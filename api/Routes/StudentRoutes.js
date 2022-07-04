const { checkAdminToken, checkStudentToken } = require("../Auth")
const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses } = require("../Controllers/StudentControllers")
const Student = require("../Models/Student")

const router = require("express").Router()

router.post("/addcourse", addCourseToStudent)

router.get("/", getStudents)

router.get("/courses/:student_id", getStudentCourses)

router.delete("/:student_id", deleteStudent)
module.exports = router