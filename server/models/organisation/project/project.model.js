const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    project_name : String,
    member_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member"
    },
    chat_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat" 
    },
    analytics_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics" 
    },
})