const mongoose = require("mongoose");
const kanbanSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    todo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }],
    doing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }],
    done: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }],
});

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
