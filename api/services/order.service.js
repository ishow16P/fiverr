import Order from "../models/order.model.js";

export const saveOrder = async (data) => {
  try {
    const order = new Order(data);
    await order.save();
    return order;
  } catch (error) {
    throw error;
  }
};

export const findOrders = async (condition) => {
  try {
    const orders = await Order.find(condition);
    return orders;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (condition, data) => {
  try {
    const orders = await Order.findOneAndUpdate(condition, data);
    return orders;
  } catch (error) {
    throw error;
  }
};
