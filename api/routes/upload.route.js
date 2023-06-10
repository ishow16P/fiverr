import express from "express";
import multer from "multer";
import path from "path";
import { badRequest, success } from "../utils/response.js";

const router = express.Router();

const uploadFilePath = path.resolve("public/uploads");

const storage = multer.diskStorage({
destination: uploadFilePath,
filename: function (req, file, cb) {
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
const fileExtension = path.extname(file.originalname);
cb(null, uniqueSuffix + fileExtension);
},
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return badRequest(req, ers);
  }

  return res
    .status(200)
    .send({ url: `http://localhost:8080/uploads/${req.file.filename}` });
});

export default router;
