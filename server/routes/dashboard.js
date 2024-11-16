const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/:userId", async (req, res) => {
    const id = req.params.userId;

    try {
        const user = await User.findOne({ _id: id })
            .populate({
                path: "organisations",
                populate: {
                    path: "projects",
                    populate: {
                        path: "member_id.member", 
                        select: "username email", 
                    },
                },
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;