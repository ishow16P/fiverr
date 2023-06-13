import {
  deleteGigById,
  findGigById,
  findGigs,
  saveGig,
} from "../services/gig.service.js";
import { forbidden, notFound, success } from "../utils/response.js";

export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller)
      return forbidden(req, res, "Only sellers can crate a gig!");
    const { body } = req;
    const data = {
      userId: req.userId,
      ...body,
    };
    const gig = await saveGig(data);
    return res.status(201).send(gig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gig = await findGigById(id);

    if (!gig) return notFound(req, res, "Gig not found!");

    if (gig.userId !== req.userId)
      return forbidden(req, res, "You can delete only your gig!");

    await deleteGigById(id);
    return success(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gig = await findGigById(id);
    if (!gig) return notFound(req, res, "Gig not found!");
    console.log(gig)
    return res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  try {
    const { query } = req;
    const filters = {
      ...(query.userId && { userId: query.userId }),
      ...(query.cat && { cat: query.cat }), //... if cat have value query cat but not have value no query cat
      ...((query.min || query.max) && {
        price: {
          ...(query.min && { $gt: query.min }), // if have query min query by $gt: min
          ...(query.max && { $lt: query.max }), // if have query max query by $lt: max
        },
      }),
      ...(query.search && { title: { $regex: query.search, $options: "i" } }), //option i query all uppercase and lowwercase
    };
    const sort = query.sort ? query.sort : null;
    const gigs = await findGigs(filters, sort);
    return res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
