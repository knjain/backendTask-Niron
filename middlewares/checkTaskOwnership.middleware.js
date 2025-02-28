const { getHotelById } = require("../services/task.service");

const checkOwnership = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const hotelId = req.params.id;

    // Find the hotel by ID
    const hotel = await getHotelById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found." });
    }

    // Compare the user ID with the 'createdBy' field of the hotel
    if (hotel.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You do not own this hotel." });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = checkOwnership;
