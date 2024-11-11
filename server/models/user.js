const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    organisations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",  // Reference to the Organisation model
        }
    ],
});

// Create the model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
