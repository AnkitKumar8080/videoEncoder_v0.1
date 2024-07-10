import { getVideoMetadata } from "../services/getVideoMetadata.js";

const getMetadata = async (req, res) => {
  try {
    const metadata = await getVideoMetadata();
    return res.status(200).json(metadata);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export { getMetadata };
