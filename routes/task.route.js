const express = require("express");
const path = require("path");
const validate = require("../middlewares/validate");
const checkOwnership = require("../middlewares/checkTaskOwnership.middleware");
const {
  taskSchema,updatetaskSchema
} = require("../validations/task.validations");
const taskController = require("../controllers/task.controller");
const {
  authenticateUserToken,
} = require("../middlewares/authToken.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: APIs related to hotel management
 */

/**
 * @swagger
 * /api/v1/hotels:
 *   post:
 *     summary: Create a new hotel
 *     description: Only hotel administrators can create hotels.
 *     tags: [Hotels]
 *     security:
 *       - HotelAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "The Grand Hotel"
 *               location:
 *                 type: string
 *                 example: "New York"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  authenticateUserToken,
  validate( taskSchema),
  taskController.createHotel
);

/**
 * @swagger
 * /api/v1/hotels/{id}:
 *   get:
 *     summary: Get hotel details
 *     description: Fetch hotel details by ID.
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved hotel details
 *       404:
 *         description: Hotel not found
 */
router.get("/:id", taskController.getHotel);

/**
 * @swagger
 * /api/v1/hotels/{id}:
 *   put:
 *     summary: Update hotel details
 *     description: Only the hotel administrator can update hotel details.
 *     tags: [Hotels]
 *     security:
 *       - HotelAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Hotel Name"
 *               location:
 *                 type: string
 *                 example: "Updated Location"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Hotel not found
 */
router.put(
  "/:id",
  authenticateUserToken,
  checkOwnership,
  validate(updatetaskSchema),
  taskController.updateHotel
);

/**
 * @swagger
 * /api/v1/hotels/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     description: Only the hotel administrator can delete the hotel.
 *     tags: [Hotels]
 *     security:
 *       - HotelAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Hotel not found
 */
router.delete(
  "/:id",
  authenticateUserToken,
  checkOwnership,
  taskController.deleteHotel
);

module.exports = router;