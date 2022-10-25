const { model, Schema } = require('mongoose')

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: Number
    },
    lessons: [{
        type: Schema.Types.ObjectId, 
        ref: "Lesson"
    }],
    course_id: {
        type: Schema.Types.ObjectId, 
        ref: "Course"
    }
})


module.exports = model('Chapter', chapterSchema)