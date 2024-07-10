import {
  getCompletedQueue,
  getCurrentEncodingQueue,
  getEncodeQueue,
  getErrorQueue,
} from "../services/encodeQueue.js";

const getQueueState = (req, res) => {
  try {
    const queueState = {
      currentEncoding: getCurrentEncodingQueue(),
      encodeQueue: getEncodeQueue(),
      completedQueue: getCompletedQueue(),
      errorQueue: getErrorQueue(),
    };
    res.status(200).json(queueState);
  } catch (error) {
    res.status(500).json("server error");
  }
};

export { getQueueState };
