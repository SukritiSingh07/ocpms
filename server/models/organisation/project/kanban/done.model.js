const mongoose = require("mongoose");

const doneSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedToName: String, 
    created: Date,
    deadline: Date,
    completed_at: Date,
    status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo",
    },
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
})

const Done = mongoose.model("Done",doneSchema);

module.exports = Done;