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
    lessons: [{
        type: Schema.Types.ObjectId, 
        ref: "Lesson"
    }]
}, {
    timestamps: true
}) 

module.exports = model('Course', courseSchema)