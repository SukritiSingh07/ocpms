const mongoose = require("mongoose");

const doingSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedToName: String, 
    created: Date,
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
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
})

const Doing = mongoose.model("Doing",doingSchema);

module.exports = Doing;