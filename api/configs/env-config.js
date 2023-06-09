import dotenv from "dotenv";
dotenv.config();

const envConfigs = {
  port: process.env.PORT,
  db_connstr: process.env.DB_CONNSTR,
  secret_key: process.env.SECRET_KEY,
  secret_token: process.env.SECRET_TOKEN,
};

export default envConfigs;
