const express = require("express");
const Organisation = require("../models/organisation/organisation.model"); // Correct import for organisation model
const Project = require("../models/organisation/projects.model"); // Import for Project model
const router = express.Router(); // Correct initialization for Express router

// Function to generate a unique ID by combining orgName with a random 6-letter suffix
function generateUniqueId(baseName) {
    const randomSuffix = Array.from({ length: 6 }, () => 
        String.fromCharCode(Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97))
    ).join('');
    return `${baseName}_${randomSuffix}`;
}

// POST route to create a new organization and project
router.post("/createorg", async (req, res) => {
    const { orgName, projectName, projectdesc } = req.body; // Assuming projectdesc is passed in req.body

    // Generate unique IDs
    const orgId = generateUniqueId(orgName); // orgId is derived from orgName
    const projId = generateUniqueId(`${orgName}_proj`); // projId with orgName prefix

    try {
        // Create the organization
        const newOrganisation = new Organisation({
            name: orgName,
            orgID: orgId,
        });

        // Save the organization to get its ObjectId for the project
        const savedOrganisation = await newOrganisation.save();

        // Create the project with reference to the organization
        const newProject = new Project({
            projectName: projectName,
            description: projectdesc,
            projectID: projId, 
            createdAt: new Date() 
        });

        const savedProject = await newProject.save();

        // Add the project ID to the organization's projects array
        savedOrganisation.projects.push(savedProject._id);
        await savedOrganisation.save();

        res.status(201).json({ 
            message: "Organization and project created successfully", 
            orgId, 
            projId 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create organization", error });
    }
});

module.exports = router;
