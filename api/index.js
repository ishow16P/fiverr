import express from "express";
import configs from "./configs/env-config.js";
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./models/db.js";
import apiRoute from "./routes/api.route.js";
import { errorHandler } from "./utils/error.js";

initDB(configs.db_connstr);

const app = express();

app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoute);

app.use(errorHandler);

app.listen(configs.port, () => {
  console.log("server running port", configs.port);
});
