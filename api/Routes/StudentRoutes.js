const { param, checkSchema } = require("express-validator")
const { checkStudentToken, checkAdminToken } = require("../Auth")
const { addCourseToStudent, getStudents, deleteStudent, getStudentCourses, updateStudent, deleteEnrollRequest, createEnrollRequest, getStudentProgress } = require("../Controllers/StudentControllers")

const router = require("express").Router()

router.post("/addcourse",  checkAdminToken, checkSchema({
    student_id: {
        isMongoId: {
            errorMessage: "invalid student id"
        }
    },
    course_id: {
        isMongoId: {
            errorMessage: "invalid course id"
        }
    }
}), addCourseToStudent)

router.get("/",  checkAdminToken, getStudents)
router.get("/progress", checkStudentToken, getStudentProgress)
router.get("/courses/:student_id", checkStudentToken, param("student_id", "invalid student id.").isMongoId(), getStudentCourses)
router.put("/:student_id",  checkStudentToken, param("student_id", "invalid student id.").isMongoId(), updateStudent)
router.delete("/request/:request_id", checkAdminToken, param("request_id", "invalid student id.").isMongoId(), deleteEnrollRequest)
router.delete("/:student_id",  checkAdminToken, param("student_id", "invalid student id.").isMongoId(), deleteStudent)
router.post("/request", checkStudentToken,  checkSchema({
    course_id: {
        isMongoId: {
            errorMessage: "invalid course id"
        }
    }
}), createEnrollRequest)
module.exports = router