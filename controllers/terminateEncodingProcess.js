import { terminateEncoding } from "../services/videoEncoder.js";

const terminateEncodingProcess = async (req, res) => {
  try {
    terminateEncoding();
    return res.status(200).json("encoding terminated successfully");
  } catch (error) {
    res.status(500).json({ message: `server error ${error}` });
  }
};

export default terminateEncodingProcess;
