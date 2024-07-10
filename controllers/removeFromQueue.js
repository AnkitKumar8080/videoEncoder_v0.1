import { rmTaskFromEncodeQueue } from "../services/encodeQueue.js";

const removeFromQueue = async (req, res) => {
  try {
    rmTaskFromEncodeQueue(req.params.filename);
    return res.status(200).json("removie video from queue successfully");
  } catch (error) {
    return res.status(500).json("server side error ", error);
  }
};

export default removeFromQueue;
