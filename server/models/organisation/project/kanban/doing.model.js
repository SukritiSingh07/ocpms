const mongoose = require("mongoose");

const doingSchema = mongoose.Schema({
    title: String,
    description: String,
    started_at: String,
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
    due_date: String,
    status: {
        type: String,
        default: "doing"
    }
})

const Doing = mongoose.model("Doing",doingSchema);

module.exports = Doing;