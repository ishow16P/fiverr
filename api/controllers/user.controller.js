export const getUser = (req, res, next) => {
    try {
      res.status(200).send({
        message:"it work!!"
      });
    } catch (error) {
      next(error);
    }
  };
  