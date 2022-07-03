const { checkAdminToken, checkStudentToken } = require("../Auth")
const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses } = require("../Controllers/StudentControllers")
const Student = require("../Models/Student")

const router = require("express").Router()

router.post("/addcourse", checkAdminToken, addCourseToStudent)

router.get("/", checkAdminToken, getStudents)

router.get("/courses/:student_id",checkStudentToken, getStudentCourses)

router.delete("/:student_id",checkAdminToken, deleteStudent)
module.exports = router