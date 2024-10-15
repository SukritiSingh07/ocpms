const mongoose = require('mongoose');

const orgAdminSchema = ({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        unique: true,
    },
    userType: String,
})

const OrgAdmin = mongoose.model("OrgAdmin",orgAdminSchema);

module.exports = OrgAdmin;