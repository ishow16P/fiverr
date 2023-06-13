import Gig from "../models/gig.model.js";

export const saveGig = async (data) => {
  try {
    const gig = new Gig(data);
    await gig.save();
    return gig;
  } catch (error) {
    throw error;
  }
};

export const deleteGigById = async (id) => {
  try {
    const gig = await Gig.findByIdAndDelete(id);
    return gig;
  } catch (error) {
    throw error;
  }
};

export const findGigById = async (id) => {
  try {
    const gig = await Gig.findById(id);
    return gig;
  } catch (error) {
    throw error;
  }
};

export const findGigs = async (condition, sort) => {
  try {
    const gigs = await Gig.find(condition).sort({ [sort]: -1 });
    return gigs;
  } catch (error) {
    throw error;
  }
};
