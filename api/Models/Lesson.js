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
    file_type: {
        type: String,
        enum: ["VIDEO, FILE"]
    },
    chapter_id: {
        type: Schema.Types.ObjectId, 
        ref: "Course"
    }
}) 

module.exports = model('Lesson', lessonSchema)