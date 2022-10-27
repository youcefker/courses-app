const {  checkStudentToken, checkAdminToken, checkToken } = require("../Auth")
const { getAllLessons, getLesson, updateLesson, deleteLesson, getLessonFileStream, getCourseLessons, completeLesson, addLessonToCourse, getLessonFile, addLessonToChapter, getCourseChaptersWithLessons } = require("../Controllers/CourseControllers")
const multer = require('multer');
const { param, checkSchema } = require("express-validator");

const router = require("express").Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'lessons/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + ".mp4")
    },
})
const upload = multer({
    storage
}).single("lesson_file");

router.get("/",  checkAdminToken, getAllLessons)
router.get("/course/:course_id", checkStudentToken, param("course_id", "invalid course id.").isMongoId(), getCourseChaptersWithLessons)
router.post('/chapter/:chapter_id', checkAdminToken, upload, param("chapter_id", "invalid chapter id.").isMongoId(), checkSchema({
    name: {
        isLength: {
            errorMessage: "lesson name should not be empty.",
            options: {
                min: 1
            }
        }
    },
    description: {
        isLength: {
            errorMessage: "lesson description should not be empty.",
            options: {
                min: 1
            }
        }
    }
}), addLessonToChapter)
router.get("/:lesson_id", checkStudentToken, param("lesson_id", "invalid lesson id.").isMongoId(), getLesson)
router.put("/:lesson_id", checkAdminToken, param("lesson_id", "invalid lesson id.").isMongoId(), checkSchema({
    name: {
        optional: true,
        isLength: {
            errorMessage: "lesson name should not be empty.",
            options: {
                min: 1
            }
        }
    },
    description: {
        optional: true,
        isLength: {
            errorMessage: "lesson description should not be empty.",
            options: {
                min: 1
            }
        }
    }
}), updateLesson)
router.delete("/:lesson_id", checkAdminToken, param("lesson_id", "invalid lesson id.").isMongoId(), deleteLesson)
router.post("/complete", checkStudentToken, completeLesson)
router.get("/file/:lesson_id", param("lesson_id", "invalid lesson id.").isMongoId(), getLessonFile )
module.exports = router