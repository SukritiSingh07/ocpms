const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  projectID: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  member_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    }
  ],
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat", 
  },
  analytics_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Analytics", 
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation"
  }
});

// Create the model from the schema
const Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;
