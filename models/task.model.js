const mongoose = require("mongoose");
const {TASK_STATUS_ENUM,TASK_STATUS} = require("../configs/constants.config")

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
  taskDescription: {
    type: String,
  },
  status: {
    type: String,
    enum: TASK_STATUS_ENUM,
    default: TASK_STATUS.INCOMPLETE,
  },
  priority: {
    type: Number,
    default: 1,
  },
}, 
{ 
  timestamps: true
});

const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;
