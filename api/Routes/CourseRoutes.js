const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse, addLessonToCourse, getAllLessons } = require('../Controllers/CourseControllers')

const router = require('express').Router()
// course routes 
router.post('/', createCourse)
router.get('/', getAllCourses)
router.get('/:course_id', getCourse)
router.put('/:course_id', updateCourse)
router.delete('/:course_id', deleteCourse)

// lesson routes

router.post("/:course_id/lesson", addLessonToCourse)
router.get("/lesson", getAllLessons)

module.exports = router