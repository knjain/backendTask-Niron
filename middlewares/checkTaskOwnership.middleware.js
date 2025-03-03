const { getTask } = require("../services/task.service");

const checkOwnership = async (req, res, next) => {
  try {
    const userId = req.user.userId;
   
    // Find the Task by ID
    const task = await getTask(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    // Compare the user ID with the 'createdBy' field of the hotel
    if (task.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You do not own this Task." });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = checkOwnership;
