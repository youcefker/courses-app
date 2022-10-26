const { param, checkSchema } = require("express-validator")
const { checkAdminToken } = require("../Auth")
const { addChapterToCourse, deleteChapter, updateChapter } = require("../Controllers/CourseControllers")

const router = require("express").Router()

router.post("/course/:course_id", checkAdminToken, checkSchema({
    name: {
        isLength: {
            errorMessage: "chapter name should not be empty."
        }
    }
}), addChapterToCourse)
router.delete("/:chapter_id", checkAdminToken, param("chapter_id", "invalid chapter id.").isMongoId(), deleteChapter)
router.put("/:chapter_id", checkAdminToken, param("chapter_id", "invalid chapter id.").isMongoId(), checkSchema({
    name: {
        optional: true,
        isLength: {
            errorMessage: "chapter name should not be empty."
        }
    }
}), updateChapter)

module.exports = router