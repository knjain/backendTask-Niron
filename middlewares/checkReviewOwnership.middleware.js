const Review = require("../models/review.model");
//To chk if the user is the owner of the review
const checkReviewOwnership = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkReviewOwnership };
