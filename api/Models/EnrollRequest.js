const { model, Schema } = require('mongoose')

const enrollRequestSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    course_name: {
        type: String, 
        required: true, 
    },
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    student_name: {
        type: String, 
        required: true,
    }
},
{ timestamps: true }) 

module.exports = model('EnrollRequest', enrollRequestSchema)