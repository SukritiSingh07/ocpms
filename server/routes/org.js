const express = require("express");
const router = express.Router();
const Organisation = require("../models/organisation/organisation.model");
const Project = require("../models/organisation/project.model.js"); 


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

        let existingOrg = await Organisation.findOne({ orgID });
        while (existingOrg) {
            orgID = generateUniqueId(orgName);  
            existingOrg = await Organisation.findOne({ orgID }); 
        }

        let existingProject = await Project.findOne({ projectID });
        while (existingProject) {
            projectID = generateUniqueId(projectName); 
            existingProject = await Project.findOne({ projectID }); 
        }

        const newProject = new Project({
            projectName,
            description: projectdesc,
            projectID,
            organisation: null, 
            member_id: [user._id] 
        });
        await newProject.save();

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
            project: newProject
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

        res.status(200).json({
            message: "User added to the project successfully",
            project,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding user to project" });
    }
});


module.exports = router;
