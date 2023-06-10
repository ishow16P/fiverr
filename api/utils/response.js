export const success = (req, res, message = "Success") => {
  return res.status(200).send({
    resultCode: "20000",
    errorCode: message,
  });
};
export const created = (req, res, message = "Created") => {
  return res.status(201).send({
    resultCode: "20100",
    errorCode: message,
  });
};
export const badRequest = (req, res, message = "Bad request!") => {
  return res.status(400).send({
    resultCode: "40000",
    errorCode: message,
  });
};
export const forbidden = (req, res, message = "Forbidden!") => {
  return res.status(403).send({
    resultCode: "40300",
    errorCode: message,
  });
};
export const notFound = (req, res, message = "Not found!") => {
  return res.status(404).send({
    resultCode: "40400",
    errorCode: message,
  });
};
export const serverError = (req, res, message = "Server Error") => {
  return res.status(500).send({
    resultCode: "50000",
    errorCode: message,
  });
};
