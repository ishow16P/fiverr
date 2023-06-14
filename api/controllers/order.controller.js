import { findGigById } from "../services/gig.service.js";
import { findOrders, saveOrder } from "../services/order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const { params } = req;
    const gigId = params.gigId;
    const gig = await findGigById(gigId);

    const orderData = {
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary",
    };

    const order = await saveOrder(orderData);

    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
};
export const getOrders = async (req, res, next) => {
  try {
    const queryOrders = {
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    };
    const orders = await findOrders(queryOrders);
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};
