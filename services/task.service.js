const Tasks = require("../models/task.model");
const path = require("path");
const fs = require("fs-extra");

module.exports = {
  createTask: async (data, createdBy) => {
    console.log("in service", data, createdBy);
    const task = new Tasks({ ...data, createdBy });
    return await task.save();
  },

  getTaskById: async (userId) => {
    return await Tasks.find({createdBy: userId});
  },

  updateHotel: async (taskId, updateData) => {
    const updateObj = { ...updateData };
    return await Tasks.findByIdAndUpdate(taskId, updateObj, { new: true });
  },

  deleteHotel: async (hotelId) => {
    return await Tasks.findByIdAndDelete(hotelId);
  },
};
