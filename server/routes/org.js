const express = require("express");
const router = express.Router();
const Organisation = require("../models/organisation/organisation.model");
const Project = require("../models/organisation/project.model.js"); 
const Chat = require('../models/organisation/project/chat/chat.model');
const Kanban = require('../models/organisation/project/kanban/kanban.model');
const Analytics = require('../models/organisation/project/analytics/analytics.model');


function generateUniqueId(baseName) {
    const randomSuffix = Array.from({ length: 5 }, () => 
        String.fromCharCode(Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97))
    ).join('');
    return `${baseName}_${randomSuffix}`;
}


router.post("/createorg", async (req, res) => {
    const { orgName, projectName, projectdesc, user } = req.body; 
    try {
        let orgID = generateUniqueId(orgName);
        let projectID = generateUniqueId(projectName);

        // Unique Project ID Generation Check
        let existingProject = await Project.findOne({ projectID });
        while (existingProject) {
            projectID = generateUniqueId(projectName); 
            existingProject = await Project.findOne({ projectID }); 
        }

        // Step 1: Create the Project Document first
        const newProject = new Project({
            projectName,
            description: projectdesc,
            projectID,
            organisation: null, 
            member_id: [user._id]
        });
        await newProject.save();

        // Step 2: Use the Project ID to create Chat, Kanban, Analytics
        const chat = await Chat.create({ projectId: newProject._id, messages: [] });
        const kanban = await Kanban.create({
            projectId: newProject._id,
            todo: [],
            doing: [],
            done: [],
        });
        const analytics = await Analytics.create({ projectId: newProject._id, metrics: {} });

        // Step 3: Update the Project Document with created IDs
        newProject.chat_id = chat._id;
        newProject.kanban_id = kanban._id;
        newProject.analytics_id = analytics._id;
        await newProject.save();

        // Step 4: Create Organisation and Link Project
        const newOrganisation = new Organisation({
            name: orgName,
            orgAdmin_id: user._id,
            orgID,
            projects: [newProject._id]
        });
        await newOrganisation.save();

        newProject.organisation = newOrganisation._id;
        await newProject.save();

        res.status(201).json({
            message: "Organisation and Project created successfully",
            organisation: newOrganisation,
            project: newProject,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating organisation or project" });
    }
});

router.post("/joinorg", async (req, res) => {
    const { user, orgCode, projCode } = req.body;

    try {

        const organisation = await Organisation.findOne({ orgID: orgCode });
        if (!organisation) {
            return res.status(404).json({ error: "Organisation not found" });
        }

        const project = await Project.findOne({ projectID: projCode, organisation: organisation._id });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        project.member_id.push(user); 
         
        await project.save();
        user.organisations.push(organisation._id);
        await user.save();

        const updatedProject = await Project.findOne({ projectID: projCode })
        .populate("member_id", "username email"); // Populate to return full user details

    res.status(200).json({
        message: "User added to the project successfully",
        project: updatedProject,
        members: updatedProject.member_id // Return full list of users
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding user to project" });
    }
});


module.exports = router;
