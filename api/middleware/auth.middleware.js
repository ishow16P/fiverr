import { verifyToken } from "../services/jwt.service.js";
import { findOneUserById } from "../services/user.service.js";

export const authToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res.status(401).send({ message: "Unauthorization" });

    const token = req.headers["authorization"].replace("Bearer ", "") || req.cookies.accessToken;
    if (!token) return res.status(401).send({ message: "Unauthorization" });

    const decoded = verifyToken(token);
    const user = await findOneUserById(decoded.id);
    if (!user) return res.status(401).send({ message: "Unauthorization" });

    req.isSeller = decoded.isSeller;
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Unauthorization" });
  }
};

export const authRefreshToken = async (req, res, next) => {
  try {
    if (!req.headers["Authorization"])
      return res.status(401).send({ message: "Unauthorization" });

    const token = req.headers["Authorization"].replace("Bearer ", "");

    if (!token) return res.status(401).send({ message: "Unauthorization" });

    const decoded = verifyRefreshToken(token);
    if (!decoded) return res.status(401).send({ message: "Unauthorization" });

    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};
