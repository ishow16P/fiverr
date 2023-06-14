import {
  findConversationById,
  findConversations,
  findOndConversation,
  saveConversation,
  updateOneConversation,
} from "../services/conversation.service.js";
import { notFound } from "../utils/response.js";

export const createConversation = async (req, res, next) => {
  try {
    const { body } = req;
    const conversationData = {
      id: req.isSeller ? req.userId + body.to : body.to + req.userId,
      sellerId: req.isSeller ? req.userId : body.to,
      buyerId: req.isSeller ? body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    };
    const coversation = await saveConversation(conversationData);
    return res.status(201).send(coversation);
  } catch (error) {
    next(error);
  }
};
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await findConversations(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    return res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const { params } = req;
    const conversation = await findOndConversation({ id: params.id });
    if (!conversation) return notFound(req, res);
    return res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversation = async (req, res, next) => {
  try {
    const { params } = req;
    const updatedConversation = await updateOneConversation(
      {
        id: params.id,
      },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      }
    );
    res.status(200).send(updatedConversation);
  } catch (error) {
    next(error);
  }
};
