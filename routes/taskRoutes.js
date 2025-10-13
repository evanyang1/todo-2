const express = require("express");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const taskRouter = express.Router();

// get tasks
taskRouter.get("/", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId).populate("tasks");
    res.status(200).json({ success: true, tasks: user.tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Create task
taskRouter.post("/", authMiddleware, async (req, res) => {
  console.log(req.body);
  const { name, dueDate } = req.body;
  const userId = req.user._id;

  try {
    const newTask = new taskModel({ name, dueDate });
    const savedTask = await newTask.save();

    // Add task to user's tasks array
    await userModel.findByIdAndUpdate(userId, {
      $push: { tasks: savedTask._id },
    });

    res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Update task
taskRouter.put("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const { name, dueDate } = req.body;
  const userId = req.user._id;

  try {
    // Check if the task belongs to the user
    const user = await userModel.findById(userId);
    if (!user.tasks.includes(new mongoose.Types.ObjectId(taskId))) {
      return res
        .status(403)
        .json({ message: "Task not found or access denied" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { name, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete task
taskRouter.delete("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;
  console.log("Deleting task:", taskId, "for user:", userId);

  try {
    await taskModel.findByIdAndDelete(taskId);
    await userModel.findByIdAndUpdate(userId, {
      $pull: { tasks: new mongoose.Types.ObjectId(taskId) },
    });

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = taskRouter;
