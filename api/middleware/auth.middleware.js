import { verifyToken } from "../services/jwt.service.js";

export const authToken = async (req, res, next) => {
  try {
    if (!req.headers["Authorization"])
      return res.status(401).send({ message: "Unauthorization" });

    const token = req.headers["Authorization"].replace("Bearer ", "");

    if (!token) return res.status(401).send({ message: "Unauthorization" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).send({ message: "Unauthorization" });

    next();
  } catch (error) {
    next(error);
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
