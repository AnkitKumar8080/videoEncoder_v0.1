import { generateToken } from "../services/token.js";

const userDetails = {
  username: "admin",
  password: "admin",
  token: generateToken,
};

export { userDetails };
