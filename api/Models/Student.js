const { model, Schema } = require('mongoose')

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    courses:[{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }],
    progress: [{
        course_id:{
            type: Schema.Types.ObjectId,
            ref: "Course"
        },
        lessons_progress: [{
            lesson_id: {
                type: Schema.Types.ObjectId,
                ref: "Lesson"
            }, 
            completed: {
                type: Boolean,
                default: false
            }
        }]
    }]
}) 

module.exports = model('Student', studentSchema)