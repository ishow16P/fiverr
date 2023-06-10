import jwt from "jsonwebtoken";
import configs from "../configs/env-config.js";

export const generateToken = (payload = null) => {
  return jwt.sign(payload, configs.secret_key, {
    expiresIn: "2h",
    algorithm: "HS256",
  });
};

export const generateRefreshToken = (payload = null) => {
  return jwt.sign(payload, configs.secret_token, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, configs.secret_key);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, configs.secret_token);
};
