const { checkStudentToken, checkAdminToken } = require("../Auth")
const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses, updateStudent, deleteEnrollRequest } = require("../Controllers/StudentControllers")

const router = require("express").Router()

router.post("/addcourse",  checkAdminToken, addCourseToStudent)

router.get("/",  checkAdminToken, getStudents)

router.get("/courses/:student_id", checkStudentToken, getStudentCourses)
router.put("/:student_id",  checkStudentToken, updateStudent)
router.delete("/request/:request_id", checkAdminToken, deleteEnrollRequest)
router.delete("/:student_id",  checkAdminToken, deleteStudent)
module.exports = router