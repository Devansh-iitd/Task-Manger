const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 characters long"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [2, "Description must be at least 2 characters long"]
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100

    },
    completed: {
        type: Boolean,
        default: false
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    superTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"]
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);