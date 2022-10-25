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
    teacher_name: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    chapters: [{
        type: Schema.Types.ObjectId, 
        ref: "Chapter"
    }],
    students: [{
        type: Schema.Types.ObjectId, 
        ref: "Student"
    }]
}, {
    timestamps: true
}) 

module.exports = model('Course', courseSchema)