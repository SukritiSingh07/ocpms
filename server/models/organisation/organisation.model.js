// organisation.model.js (using require)
const mongoose = require('mongoose');
const projects=require('./projects.model');

const organisationSchema = mongoose.Schema({
  name: String,
  orgAdmin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrgAdmin",
  },
  orgID: {
    type: String, // Use uuidv4 to generate a unique ID for each organization
    unique: true,  // Ensure the orgID is unique across all documents in the collection
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId, // References the Project model if projects are stored in another collection
      ref: "Project", // Name of the model for projects if using a separate model
    }
  ]
});

// Create the model from the schema
const Organisation = mongoose.model('Organisation', organisationSchema);

// Export the model
module.exports = Organisation;
