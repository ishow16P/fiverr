import { updateOneConversation } from "../services/conversation.service.js";
import { findMessage, saveMessage } from "../services/message.service.js";

export const getMessages = async (req, res, next) => {
  try {
    const { params } = req;
    const messages = await findMessage({ conversationId: params.id });
    return res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { body } = req;
    const messageData = {
      conversationId: body.conversationId,
      userId: req.userId,
      desc: body.desc,
    };
    const newMessage = await saveMessage(messageData);
    await updateOneConversation(
      {
        id: body.conversationId,
      },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: body.desc,
        },
      }
    );
    return res.status(201).send(newMessage);
  } catch (error) {
    next(error);
  }
};
