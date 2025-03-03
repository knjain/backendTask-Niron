const taskService = require("../services/task.service");

module.exports = {
  createTask: async (req, res) => {
    try {
      const task = await taskService.createTask(
        req.body,
        req.user.userId
      );
      return res.status(201).json({
        success: true,
        task,
        message: "Task created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const tasks = await taskService.getTaskById(req.user.userId);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.body);
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  },
  

  deleteTask: async (req, res) => {
    try {
      const deletedTask = await taskService.deleteTaskById(req.params.id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully.", id: req.params.id });
    } catch (error) {
      console.error("Delete Error:", error); 
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
};
