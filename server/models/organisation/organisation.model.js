const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  orgAdmin_id: {  
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "admin"
  },
  orgID: {
    type: String,
    unique: true,
    required: true
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
});

// Create the model from the schema
const Organisation = mongoose.model('Organisation', organisationSchema);

// Export the model
module.exports = Organisation;
