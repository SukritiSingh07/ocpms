const express = require("express");
const Todo = require("../models/organisation/project/kanban/todo.model");
const Doing = require("../models/organisation/project/kanban/doing.model");
const Done = require("../models/organisation/project/kanban/done.model");
const router = express.Router();

// GET all tasks across todo, doing, and done lists
router.get("/kanban", async (req, res) => {
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

// ADD a new task to the 'todo' list
router.post("/kanban/todo", async (req, res) => {
    const { title, description, assignedTo, timer } = req.body;
    const newTask = new Todo({ title, description, assignedTo, timer, status: "" });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Error adding task", error });
    }
});

// MOVE a task from 'todo' to 'doing'
router.put("/kanban/move-to-doing/:id", async (req, res) => {
    try {
        const task = await Todo.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found in Todo list" });

        const taskInDoing = new Doing(task.toObject());
        await taskInDoing.save();
        res.status(200).json({ message: "Task moved to Doing", task: taskInDoing });
    } catch (error) {
        res.status(400).json({ message: "Error moving task", error });
    }
});

// MOVE a task from 'doing' to 'done'
router.put("/kanban/move-to-done/:id", async (req, res) => {
    try {
        const task = await Doing.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found in Doing list" });

        const taskInDone = new Done(task.toObject());
        await taskInDone.save();
        res.status(200).json({ message: "Task moved to Done", task: taskInDone });
    } catch (error) {
        res.status(400).json({ message: "Error moving task", error });
    }
});

// DELETE a task from 'done' list
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
