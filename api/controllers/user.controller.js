import { deleteOneUser } from "../services/user.service.js";
import { notFound, success } from "../utils/response.js";

export const getUser = (req, res, next) => {
  try {
    res.status(200).send({
      message: "it work!!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await deleteOneUser({ _id: userId });
    if (!result) return notFound(req, res, "User not found!");

    return success(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
