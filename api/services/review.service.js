import Review from "../models/review.model.js";

export const findOneReview = async (conditon) => {
  try {
    const review = await Review.findOne(conditon);
    return review;
  } catch (error) {
    throw error;
  }
};

export const saveReview = async (data) => {
  try {
    const gig = new Review(data);
    await gig.save();
    return gig;
  } catch (error) {
    throw error;
  }
};

export const findReviews = async (conditon) => {
  try {
    const reviews = await Review.find(conditon);
    return reviews;
  } catch (error) {
    throw error;
  }
};
