const express = require("express");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const taskRouter = express.Router();

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

// Delete task
taskRouter.delete("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;

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
