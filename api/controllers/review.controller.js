import { updateOneGig } from "../services/gig.service.js";
import {
  findOneReview,
  findReviews,
  saveReview,
} from "../services/review.service.js";
import { forbidden } from "../utils/response.js";

export const createReview = async (req, res, next) => {
  try {
    if (req.isSeller)
      return forbidden(req, res, "Sellers can't create a review!");
    const { body } = req;
    const queryReview = {
      gigId: body.gigId,
      userId: req.userId,
    };
    const review = await findOneReview(queryReview);
    if (review)
      return forbidden(
        req,
        res,
        "You have already craeted a review for this gig!"
      );

    const reviewData = {
      userId: req.userId,
      gigId: body.gigId,
      desc: body.desc,
      star: body.star,
    };
    const newReview = await saveReview(reviewData);

    await updateOneGig(
      { _id: newReview.gigId },
      {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      }
    );
    return res.status(201).send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const { gigId } = req.params;
    const reviews = await findReviews({ gigId: gigId });
    return res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "it work!!",
    });
  } catch (error) {
    next(error);
  }
};
