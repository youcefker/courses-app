const { checkStudentToken } = require("../Auth")
const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses, updateStudent, deleteEnrollRequest } = require("../Controllers/StudentControllers")

const router = require("express").Router()

<<<<<<< HEAD
router.post("/addcourse",  addCourseToStudent)

router.get("/",  getStudents)

router.get("/courses/:student_id",  getStudentCourses)
router.put("/:student_id",  updateStudent)
router.delete("/request/:request_id",  deleteEnrollRequest)
router.delete("/:student_id",  deleteStudent)
=======
router.post("/addcourse", addCourseToStudent)

router.get("/", getStudents)

router.get("/courses/:student_id", getStudentCourses)
router.put("/:student_id", updateStudent)
router.delete("/request/:request_id", deleteEnrollRequest)
router.delete("/:student_id", deleteStudent)
>>>>>>> 269658785727881df3ab2b54911803adc9794d4b
module.exports = router