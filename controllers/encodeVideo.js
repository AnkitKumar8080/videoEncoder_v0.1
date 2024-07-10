import { enqueueTask } from "../services/encodeQueue.js";
import { getFilename } from "../services/getVideoFilenames.js";
import { videoFormatEncoder } from "../services/videoEncoder.js";
const encodeVideo = async (req, res) => {
  try {
    const taskObj = {
      filename: req.body.filename,
      encoding: req.body.encoding,
      language: req.body.language,
    };
    const filenames = getFilename();
    if (!filenames.includes(taskObj.filename)) {
      return res
        .status(404)
        .json("File not found in the local video directory");
    }
    // videoFormatEncoder(filename, encoding);
    enqueueTask(taskObj); // adding the video conversion to the queue
    return res.status(200).json("files started to encode");
  } catch (error) {
    console.log(error);
    return res.status(500).json("server side error");
  }
};

export { encodeVideo };
