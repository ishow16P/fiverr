import { findGigById } from "../services/gig.service.js";
import {
  findOrders,
  saveOrder,
  updateOrder,
} from "../services/order.service.js";
import Stripe from "stripe";
import configs from "../configs/env-config.js";
import { success } from "../utils/response.js";

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

export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(configs.payment_api_key);
    const { params } = req;
    console.log(params);
    const gig = await findGigById(params.id);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const orderData = {
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    };
    await saveOrder(orderData);

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const { body } = req;
    const orders = await updateOrder(
      {
        payment_intent: body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    return success(req, res, "Order has been coonfirmed.");
  } catch (error) {
    next(error);
  }
};
