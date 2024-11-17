const express = require("express");
const router = express.Router();
const Organisation = require("../models/organisation/organisation.model");
const Project = require("../models/organisation/project.model.js");
const Chat = require('../models/organisation/project/chat/chat.model');
const Analytics = require('../models/organisation/project/analytics/analytics.model');
const Todo = require('../models/organisation/project/kanban/todo.model.js');
const Doing = require('../models/organisation/project/kanban/doing.model.js');
const Done = require('../models/organisation/project/kanban/done.model.js');
const User = require('../models/user.js');
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
        let projectID = generateUniqueId(orgName);

        // Unique Project ID Generation Check
        let existingProject = await Project.findOne({ projectID });
        while (existingProject) {
            projectID = generateUniqueId(orgName);
            existingProject = await Project.findOne({ projectID });
        }

        // Step 1: Create the Project Document first
        const newProject = new Project({
            projectName,
            description: projectdesc,
            projectID,
            member_id:[{
                member: user._id,
                role: 'Admin'
            }],
            organisation: null,
        });
        await newProject.save();

        // Step 2: Use the Project ID to create Chat, Kanban, Analytics
        const chat = await Chat.create({ projectId: newProject._id, messages: [] });
        const todoList = await Todo.create([]);
        const doingList = await Doing.create([]);
        const doneList = await Done.create([]);

        const analytics = await Analytics.create({ projectId: newProject._id, metrics: {} });

        // Step 3: Update the Project Document with created IDs
        newProject.chat_id = chat._id;
        // newProject.kanban_id = kanban._id;
        newProject.analytics_id = analytics._id;
        await newProject.save();

        // Step 4: Create Organisation and Link Project
        const newOrganisation = new Organisation({
            name: orgName,
            orgAdmin: user._id,
            orgID,
            projects: [newProject._id]
        });
        await newOrganisation.save();

        const userDoc = await User.findById(user._id);
        if (!userDoc) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!userDoc.organisations) {
            userDoc.organisations = [];
        }
        userDoc.organisations.push(newOrganisation._id);
        await userDoc.save();

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

    if (!user || !orgCode || !projCode) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const organisation = await Organisation.findOne({ orgID: orgCode });
        if (!organisation) {
            return res.status(404).json({ error: "Organisation not found" });
        }

        const project = await Project.findOne({ projectID: projCode });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const isMember = project.member_id.some(member => member.member.toString() === user._id);
        if (isMember) {
            return res.status(400).json({ error: "User is already a member of this project" });
        }

        if (!Array.isArray(organisation.orgUser_id)) {
            organisation.orgUser_id = [];
        }
        organisation.orgUser_id.push({ user: user._id, role: "member" });
        await organisation.save();

        if (!Array.isArray(project.member_id)) {
            project.member_id = [];
        }
        project.member_id.push({ member: user._id, role: "member" });
        await project.save();

        const foundUser = await User.findOne({ _id: user._id });
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }

        foundUser.organisations.push(organisation._id);
        await foundUser.save();

        res.status(200).json({
            message: "User added to the project successfully",
            project: project,
            members: project.member_id,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error adding user to project" });
    }
});




module.exports = router;
