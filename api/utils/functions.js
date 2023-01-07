module.exports = {
    calculateStudentProgress : (studentProgress) => {
        const coursesKeys = Object.keys(studentProgress)
        let coursesProgress = {}
        coursesKeys.map(courseId => {
            let chaptersKeys = Object.keys(studentProgress[courseId])
            let numChapters = chaptersKeys.length
            let numCompleted = 0
            chaptersKeys.map(chapterId => {
                if(studentProgress[courseId][chapterId].completed){
                    numCompleted++
                }
            })
            coursesProgress[courseId] = numCompleted / numChapters
        })
        return coursesProgress
    }
}