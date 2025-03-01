const Tasks = require("../models/task.model");
const path = require("path");
const fs = require("fs-extra");

module.exports = {
  createHotel: async (data, media, createdBy) => {
    let mediaFiles = [];

    if (media.photos && media.photos.length > 0) {
      media.photos.forEach((file) => {
        mediaFiles.push({
          mediaUrl: `/uploads/hotels/photos/${file.filename}`,
          type: "photo",
          label: data.labels ? JSON.parse(data.labels) : [],
        });
      });
    }

    if (media.videos && media.videos.length > 0) {
      media.videos.forEach((file) => {
        mediaFiles.push({
          mediaUrl: `/uploads/hotels/videos/${file.filename}`,
          type: "video",
          label: data.labels ? JSON.parse(data.labels) : [],
        });
      });
    }
    const hotel = new Hotel({ ...data, media: mediaFiles, createdBy });
    return await hotel.save();
  },

  getHotelById: async (hotelId) => {
    return await Hotel.findById(hotelId);
  },

  updateHotel: async (hotelId, updateData, files) => {
    const updateObj = { ...updateData };

    if (files) {
      let newMedia = [];

      if (files.photos) {
        newMedia.push(
          ...files.photos.map((file) => ({
            mediaUrl: `/uploads/hotels/photos/${file.filename}`,
            type: "photo",
            labels: updateData.labels || [],
          }))
        );
      }

      if (files.videos) {
        newMedia.push(
          ...files.videos.map((file) => ({
            mediaUrl: `/uploads/hotels/videos/${file.filename}`,
            type: "video",
            labels: updateData.labels || [],
          }))
        );
      }

      if (newMedia.length > 0) {
        updateObj.$push = { media: { $each: newMedia } };
      }
    }

    return await Hotel.findByIdAndUpdate(hotelId, updateObj, { new: true });
  },

  deleteHotel: async (hotelId) => {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return null;

    // Delete all media files from the server
    hotel.media.forEach((mediaPath) => {
      const filePath = path.join(__dirname, `../../${mediaPath}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    // Remove hotel document from DB
    return await Hotel.findByIdAndDelete(hotelId);
  },

  deleteSingleMedia: async (hotelId, mediaUrl) => {
    try {
      // Find the hotel and check if media exists
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        throw new Error("Hotel not found.");
      }

      const mediaItem = hotel.media.find((m) => m.mediaUrl === mediaUrl);
      if (!mediaItem) {
        throw new Error("Media not found in hotel record.");
      }

      // Construct absolute file path
      const filePath = path.join(__dirname, "../", mediaUrl);

      // Delete file from server
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
        }
      });

      // Remove media object from hotel's media array
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        { $pull: { media: { mediaUrl: mediaUrl } } }, // Ensure we match only `mediaUrl`
        { new: true }
      );

      return updatedHotel;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
