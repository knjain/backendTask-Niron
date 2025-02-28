const hotelService = require("../services/task.service");

module.exports = {
  createHotel: async (req, res) => {
    try {
      if (
        (!req.files.photos || req.files.photos.length === 0) &&
        (!req.files.videos || req.files.videos.length === 0)
      ) {
        return res
          .status(400)
          .json({ error: "At least one photo or video is required." });
      }

      const hotel = await hotelService.createHotel(
        req.body,
        req.files,
        req.user._id
      );
      return res.status(201).json({
        success: true,
        hotel,
        message: "Hotel created successfully",
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.name) {
        // Handle duplicate name error
        return res.status(400).json({ error: "Hotel name should be unique." });
      }

      res.status(500).json({ error: error.message });
    }
  },

  getHotel: async (req, res) => {
    try {
      const hotel = await hotelService.getHotelById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  updateHotel: async (req, res) => {
    try {
      const hotelId = req.params.id;
      const updatedHotel = await hotelService.updateHotel(
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

  deleteHotel: async (hotelId) => {
    try {
      // Find the hotel by ID
      const hotel = await hotelService.findById(hotelId);
      if (!hotel) {
        throw new Error("Hotel not found.");
      }

      // Delete all associated media files from the server
      hotel.media.forEach((mediaItem) => {
        const filePath = path.join(__dirname, "../", mediaItem.mediaUrl);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting file:", err);
          }
        });
      });

      // Delete the hotel from the database
      await hotelService.findByIdAndDelete(hotelId);

      return { message: "Hotel and associated media deleted successfully." };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteSingleMedia: async (req, res) => {
    try {
      const { id } = req.params;
      const { mediaUrl } = req.body;

      const updatedHotel = await hotelService.deleteSingleMedia(id, mediaUrl);

      if (!updatedHotel) {
        return res.status(404).json({ error: "Hotel or media not found." });
      }

      res.json({ message: "Media deleted successfully", hotel: updatedHotel });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
