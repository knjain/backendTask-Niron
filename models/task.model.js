const mongoose = require("mongoose");
const {TASK_STATUS_ENUM,TASK_STATUS, TASK_PRIORITY_ENUM, TASK_PRIORITY} = require("../configs/constants.config")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: TASK_STATUS_ENUM,
    default: TASK_STATUS.PENDING,               
  },
  priority: {
    type: String,
    enum: TASK_PRIORITY_ENUM,
    default: TASK_PRIORITY.HIGH,
  },
}, 
{ 
  timestamps: true
});

const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;
