export const errorHandler = (error, req, res, next) => {
  return res.status(500).send({
    resultCode: "50000",
    errorCode: "Server Error",
  });
};
