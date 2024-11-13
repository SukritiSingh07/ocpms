const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedToName: String, 
    deadline: Date,
    status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo",
    },
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;