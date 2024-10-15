const mongoose = require("mongoose");

const doneSchema = mongoose.Schema({
    title: String,
    description: String,
    completed_at: String,
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
    due_date: String,
    status: String,
})

const Done = mongoose.model("Done",doneSchema);

module.exports = Done;