const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
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

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;