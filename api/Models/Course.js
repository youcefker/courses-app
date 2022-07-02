const { model, Schema } = require('mongoose')

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
    },
    lessons: [{
        type: Schema.Types.ObjectId, 
        ref: "Lesson"
    }],
    students: [{
        type: Schema.Types.ObjectId, 
        ref: "Student"
    }]
}, {
    timestamps: true
}) 

module.exports = model('Course', courseSchema)