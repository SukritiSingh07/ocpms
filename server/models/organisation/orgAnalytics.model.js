const mongoose = require('mongoose');

const orgAnalyitcsSchema = ({
    name: String,
})

const OrgAnalytics = mongoose.model("OrgAnalytics",orgAnalyitcsSchema);

module.exports = OrgAnalytics;