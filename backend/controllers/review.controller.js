import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Estate from "../models/estate.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    estateId: req.body.estateId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      estateId: req.body.estateId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this estate!")
      );

    //TODO: check if the user purchased the estate.

    const savedReview = await newReview.save();

    await Estate.findByIdAndUpdate(req.body.estateId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ estateId: req.params.estateId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
