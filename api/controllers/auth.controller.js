import {
  generateRefreshToken,
  generateToken,
} from "../services/jwt.service.js";
import { createUser, findOneUser } from "../services/user.service.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { body } = req;
    const hashed = await bcrypt.hash(body.password, 5);
    const data = {
      ...body,
      password: hashed,
    };
    await createUser(data);
    return res.status(201).send({ message: "Created" });
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
    if (!user) return res.status(404).send({ message: "User not found!" });

    const isCorrect = bcrypt.compareSync(body.password, user.password);
    if (!isCorrect)
      return res.status(400).send({ message: "Wrong password or username!" });

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
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).send({
      message: "it work!!",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await findOneUser({ _id: userId });
    if (!user) return res.status(404).send({ message: "User not found!" });

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
        message: "Success",
      });
  } catch (error) {
    next(error);
  }
};
