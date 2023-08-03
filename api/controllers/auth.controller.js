import {
  generateRefreshToken,
  generateToken,
} from "../services/jwt.service.js";
import { createUser, findOneUser } from "../services/user.service.js";
import bcrypt from "bcrypt";
import { notFound, success, created, badRequest } from "../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const { body } = req;
    const hashed = await bcrypt.hash(body.password, 5);
    const data = {
      ...body,
      password: hashed,
    };
    await createUser(data);
    return created(req, res);
  } catch (error) { 
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { body } = req;
    // validate
    const query = { username: body.username };
    const user = await findOneUser(query);
    if (!user) return badRequest(req, res, "Wrong password or username!");

    const isCorrect = bcrypt.compareSync(body.password, user.password);
    if (!isCorrect) return badRequest(req, res, "Wrong password or username!");

    const { password, ...info } = user._doc;

    const accessToken = generateToken({
      id: user._id,
      isSeller: user.isSeller,
    });
    const refreshToken = generateRefreshToken({
      id: user._id,
    });
    return res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .send({
        accessToken,
        refreshToken,
        info
      });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", { samSite: "none", secure: true })
      .clearCookie("refreshToken", { samSite: "none", secure: true });

    return success(req, res, "User has been logged out");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await findOneUser({ _id: userId });
    if (!user) return notFound(req, res, "User not found!");

    const accessToken = generateToken({
      id: user._id,
      isSeller: user.isSeller,
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
    });

    return res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .send({
        accessToken,
        refreshToken,
      });
  } catch (error) {
    next(error);
  }
};
