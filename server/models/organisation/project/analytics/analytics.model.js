const mongoose = require("mongoose");

const analyticsSchema = mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    metrics: {
        taskCount: { type: Number, default: 0 },
        completedTasks: { type: Number, default: 0 },
        activeUsers: { type: Number, default: 0 },
    },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
