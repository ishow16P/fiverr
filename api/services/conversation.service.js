import Conversation from "../models/conversation.model.js";

export const saveConversation = async (data) => {
  try {
    const conversation = new Conversation(data);
    await conversation.save();
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const findConversationById = async (id) => {
  try {
    const conversation = await Conversation.findById(id).sort({
      updatedAt: -1,
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const findOndConversation = async (condition) => {
  try {
    const conversation = await Conversation.findOne(condition);
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const findConversations = async (condition) => {
  try {
    const conversations = await Conversation.find(condition);
    return conversations;
  } catch (error) {
    throw error;
  }
};

export const updateOneConversation = async (condition, data) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(condition, data);
    return conversation;
  } catch (error) {
    throw error;
  }
};
