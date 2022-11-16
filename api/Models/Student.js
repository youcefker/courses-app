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
    progress: {
        type: Schema.Types.Mixed
    }
}) 

module.exports = model('Student', studentSchema)