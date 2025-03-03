const Tasks = require("../models/task.model");
const path = require("path");
const fs = require("fs-extra");

module.exports = {
  createTask: async (data, createdBy) => {
    const task = new Tasks({ ...data, createdBy });
    return await task.save();
  },

  getTaskById: async (userId) => {
    return await Tasks.find({createdBy: userId});
  },

  getTask: async (taskId) => {
    return await Tasks.findById(taskId);
  },

  updateTask: async (taskId, updateData) => {
    return await Tasks.findByIdAndUpdate(taskId, updateData, { new: true });
  },

  deleteTaskById: async (taskId) => {
    return await Tasks.findByIdAndDelete(taskId);
  },
};
