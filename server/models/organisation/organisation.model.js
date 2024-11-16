const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orgUser_id: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      role: { type: String, required: true }, // Example: 'Admin', 'Member'
    },
  ],
  orgID: {
    type: String,
    unique: true,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

// Create the model from the schema
const Organisation = mongoose.model("Organisation", organisationSchema);

// Export the model
module.exports = Organisation;
