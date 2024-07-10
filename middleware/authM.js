import { userDetails } from "../db/userData.js";

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x_access_token"];
  if (!token) {
    return res.status(401).json("A token is required for authorization");
  }
  const splitToken = token.split(" ")[1];
  if (!(splitToken === userDetails.token)) {
    return res.status(401).json("Invalid token");
  }
  next();
};

export default verifyToken;
