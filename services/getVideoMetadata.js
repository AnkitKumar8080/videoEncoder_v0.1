import ffmpeg from "fluent-ffmpeg";
import { getFilename } from "./getVideoFilenames.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const probeVideo = (videoFilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoFilePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
};

const getVideoMetadata = async () => {
  const filenames = getFilename();
  let videosMetaData = [];
  for (const filename of filenames) {
    const filePath = path.join(__dirname, "../media/videos", filename);
    try {
      const metadata = await probeVideo(filePath);
      const { streams, format } = metadata;
      let newObj = {
        filename: filename,
        codecEncoding: "",
        duration: format.duration,
        format_name: format.format_long_name,
        size: format.size,
        languages: [],
      };
      streams.forEach((obj) => {
        if (obj.codec_type === "video" && obj.index === 0) {
          newObj.codecEncoding = obj.codec_long_name
            .split(" ")[0]
            .toLowerCase();
        }
        if (obj.codec_type === "audio") {
          newObj.languages.push(obj.tags.language);
        }
      });
      videosMetaData.push(newObj);
    } catch (error) {
      console.log("Error while probing file : ", filePath, "Error: ", error);
    }
  }
  return videosMetaData;
  // console.log(videosMetaData);
};

export { getVideoMetadata };
