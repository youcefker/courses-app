const { model, Schema } = require('mongoose')

const meetSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    joins: {
        type: Schema.Types.Mixed
    }
},{
    timestamps: true
})

module.exports = model('Meet', meetSchema)