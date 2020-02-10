const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: { 
        type: Date,
        default: new Date()
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // which model we are refering to
    },
    pin: {
        type: Boolean,
        default: false
    },
    bin: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

// Note is a model here
// Note is our user-defined datatype
// Find is a static/class method because it is invoked on a function
// Instance method is invoked on object

const Note = mongoose.model('Note', noteSchema)

module.exports = Note