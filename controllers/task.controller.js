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
      const hotelId = req.params.id;
      const updatedHotel = await taskService.updateTask(
        hotelId,
        req.body,
        req.files
      );

      if (!updatedHotel) {
        return res.status(404).json({ error: "Hotel not found." });
      }

      res.json({ message: "Hotel updated successfully", hotel: updatedHotel });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTask: async (hotelId) => {
    try {
      // Find the hotel by ID
      const hotel = await taskService.findById(hotelId);
      if (!hotel) {
        throw new Error("Hotel not found.");
      }

      // Delete the hotel from the database
      await taskService.findByIdAndDelete(hotelId);

      return { message: "Hotel and associated media deleted successfully." };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
