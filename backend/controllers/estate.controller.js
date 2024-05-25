import Estate from "../models/estate.model.js";
import createError from "../utils/createError.js";

export const createEstate = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create estates!"));
  }

  const newEstate = new Estate({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedEstate = await newEstate.save();
    res.status(201).json(savedEstate); // Send response after successful save
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

export const deleteEstate = async (req, res, next) => {
  try {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
      return next(createError(404, "Estate not found!"));
    }

    if (estate.userId !== req.userId) {
      return next(createError(403, "You can delete only your estates!"));
    }

    await Estate.findByIdAndDelete(req.params.id);
    res.status(200).send("Estate has been deleted!");
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

export const getEstate = async (req, res, next) => {
  try {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
      return next(createError(404, "Estate not found!"));
    }
    res.status(200).json(estate);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

export const getEstates = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const estates = await Estate.find(filters).sort({ [q.sort]: -1 });
    res.status(200).json(estates);
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};
