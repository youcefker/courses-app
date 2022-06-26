const { model, Schema } = require('mongoose')

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    filename: {
        type: String
    },
    course_id: {
        type: Schema.Types.ObjectId, 
        ref: "Course"
    }
}) 

module.exports = model('Lesson', lessonSchema)