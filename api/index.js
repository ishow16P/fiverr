import express from "express";
import configs from "./configs/env-config.js";
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./models/db.js";
import apiRoute from "./routes/api.route.js";
import { errorHandler } from "./utils/error.js";
const app = express();

initDB(configs.db_connstr);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoute);

app.use(errorHandler);

app.listen(configs.port, () => {
  console.log("server running port", configs.port);
});
