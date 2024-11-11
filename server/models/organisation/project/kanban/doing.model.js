const mongoose = require("mongoose");

const doingSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedToName: String, // To display the assigned user's name directly
    timer: Number, // Total time in minutes
    timerStart: Date, // When the task starts
    isTimeUp: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo",
    },
    created_at: { type: Date, default: Date.now },
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
})

const Doing = mongoose.model("Doing",doingSchema);

module.exports = Doing;