const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    created_at: String,
    assigned_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
    due_date: String,
    status: String,
})

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;