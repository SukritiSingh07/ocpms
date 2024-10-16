const mongoose = require("mongoose");

const organisationSchema = mongoose.Schema({
    name: String,
    orgAdmin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrgAdmin",
    },
    orgAnalytics_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrgAnalytics",
    }, 
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
})

Organisation = mongoose.model('Organisation',organisationSchema);

module.exports = Organisation;