import { userDetails } from "../db/userData.js";
import { generateToken } from "../services/token.js";
const handleLogin = async (req, res) => {
  try {
    // getting user user request
    const { username, password } = req.body;
    if (!username && !password) {
      return res.status(400).json({ message: "All input fields are required" });
    }
    if (
      userDetails.username === username &&
      userDetails.password === password
    ) {
      userDetails.token = generateToken();
      return res
        .status(200)
        .json({ username: userDetails.username, token: userDetails.token });
    } else {
      return res.status(403).json("invalid username or password");
    }
  } catch (error) {
    return res.status(500).json("server error");
  }
};

const updateLoginPassword = async (req, res) => {
  try {
    // getting user user request
    const { username, password, newPassword } = req.body;
    if (!(username && password)) {
      return res.status(400).json({ message: "All input fields are required" });
    }
    if (
      userDetails.username === username &&
      userDetails.password === password
    ) {
      userDetails.password = newPassword;
      userDetails.token = generateToken();
      return res
        .status(200)
        .json({ username: userDetails.username, token: userDetails.token });
    }
    return res.status(403).json("invalid username or password");
  } catch (error) {
    return res.status(500).json("server error");
  }
};

export { handleLogin, updateLoginPassword };
