import User from "../models/user.model.js";

export const createUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

export const findOneUser = async (condition) => {
  try {
    const user = await User.findOne(condition);
    return user;
  } catch (error) {
    throw error;
  }
};
