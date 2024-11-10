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
    type: String, // Use a unique identifier for the project, similar to orgID in Organisation model
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"], // Example statuses for the project
    default: "Pending",
  },
  member_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // Reference to Member model
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
    ref: "organisation"
  }
});

// Create the model from the schema
const Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;
