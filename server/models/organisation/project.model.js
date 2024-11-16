const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  projectID: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  member_id: [
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
  },
],
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  analytics_id: { type: mongoose.Schema.Types.ObjectId, ref: "Analytics" },
  kanban_id: { type: mongoose.Schema.Types.ObjectId, ref: "Kanban" }, // New Field
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
