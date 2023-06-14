import Message from "../models/message.model.js";

export const saveMessage = async (data) => {
  try {
    const message = new Message(data);
    await message.save();
    return message;
  } catch (error) {
    throw error;
  }
};

export const findMessage = async (condition) => {
  try {
    const messages = await Message.find(condition);
    return messages;
  } catch (error) {
    throw error;
  }
};
