const express = require("express");
const Todo = require("../models/organisation/project/kanban/todo.model");
const Doing = require("../models/organisation/project/kanban/doing.model");
const Done = require("../models/organisation/project/kanban/done.model");
const router = express.Router();

router.get("/kanban/:projectId", async (req, res) => {
    const { projectId } = req.params;
    if(!projectId){return res.send([])};
    console.log("projectid",projectId);
    try {
        const todos = await Todo.find();
        const doings = await Doing.find();
        const dones = await Done.find();
        
        res.status(200).json({
            todos,
            doings,
            dones
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
});

router.post("/kanban/todo/:projectId", async (req, res) => {
    const {projectId} = req.params;
    const { title, description, assignedTo, assignedId, timer, status = "todo" } = req.body;
    
    const timerStart = new Date();
    const deadline = new Date(timerStart.getTime() + timer * 60000); 
    
    const newTask = new Todo({
        title,
        description,
        assignedToName: assignedTo,  // Adding assignedTo to the assignedToName field
        assigned_id: assignedId,     // Set assignedId in assigned_id field
        project_id: projectId,
        deadline,
        status,
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
        console.log(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Error adding task", error });
    }
});

router.put("/kanban/move-to-doing/:id", async (req, res) => {
    try {
        const task = await Todo.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found in Todo list" });

        const taskInDoing = new Doing({ ...task.toObject(), status: "doing" }); 
        await taskInDoing.save();
        res.status(200).json({ message: "Task moved to Doing", task: taskInDoing });
    } catch (error) {
        res.status(400).json({ message: "Error moving task", error });
    }
});


router.put("/kanban/move-to-done/:id", async (req, res) => {
    try {
        const task = await Doing.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found in Doing list" });
        const completedAt = new Date(); 

        const taskInDone = new Done({
            ...task.toObject(),
            status: "done", 
            completed_at: completedAt, 
        });

        await taskInDone.save();

        res.status(200).json({ message: "Task moved to Done", task: taskInDone });
    } catch (error) {
        res.status(400).json({ message: "Error moving task", error });
    }
});

router.delete("/kanban/done/:id", async (req, res) => {
    try {
        const task = await Done.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found in Done list" });

        res.status(200).json({ message: "Task deleted from Done", task });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});

module.exports = router;
