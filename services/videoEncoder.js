import ffmpeg from "fluent-ffmpeg";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { enqueueCompleted, enqueueError } from "./encodeQueue.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// declaring the terminateEncoding function globally
let terminateEncoding;

// variable that stores encoding completion percentage
let progPerc = 0;

const getEncProgPerc = () => {
  return progPerc;
};
const setEncProgPerc = (num) => {
  return (progPerc = num);
};

const videoFormatEncoder = (inputFileName, codec, language, callback) => {
  const inputFilePath = path.join(__dirname, "../media/videos/", inputFileName);
  const outputFilePath = path.join(
    __dirname,
    "../media/videos/mp4",
    `${path.basename(inputFilePath, ".mkv")}.mp4`
  );

  console.log(inputFileName, language);

  if (codec !== "libx264") {
    // Define the options to limit CPU usage
    const cpuLimitOptions = [
      "-threads",
      process.env.CPU_CORES, // Specify the number of cores you wanted to use
      "-strict",
      "-2", // Use experimental codecs
    ];
    var command = ffmpeg(inputFilePath)
      .videoCodec("libx264") // uses cpu
      //.videoCodec("h264_nvenc") // uses gpu
      .audioCodec("aac")
      .audioChannels(6)
      .addOptions(cpuLimitOptions)
      // .audioBitrate("192k")
      // .addOptions(["-map 0:v:0", `-map 0:a:${language}`])

      // subtitles
      .addOption("-c:s", "mov_text")
      .addOption("-map", "0")
      .addOption("-strict", "-2")

      // .addOptions(["-map 0:v:0", `-map 0:a`])
      .addOptions([
        "-map 0:v:0",
        `${language === "all" ? "-map 0:a" : `-map 0:a:${language}`}`,
      ])
      .on("progress", (progress) => {
        // keeping track of encoded completed
        setEncProgPerc(Number.parseFloat(progress.percent).toFixed(2));
        // console.log(Number.parseFloat(progress.percent).toFixed(2));
      })
      .on("end", () => {
        console.log("transcoding finished");
        const completedObj = {
          filename: inputFileName,
          fromCodec: codec,
          toCodec: "libx264",
        };
        setEncProgPerc(0);

        enqueueCompleted(completedObj);
        callback(); // callback to keep encoding up, even if success or error  occured
      })
      .on("error", (err) => {
        console.error("Error", err);
        // obj containing error details
        const errorObj = {
          filename: inputFileName,
          codec: codec,
          error: err,
        };
        enqueueError(errorObj);
        callback(); // callback to keep encoding even if success or error  occured
      })
      .on("exit", () => {
        console.log("ffmpeg process terminated successfully !!");
      })
      .save(outputFilePath);
    // function to kill currently running ffmpeg process
    terminateEncoding = () => {
      command.kill();
      // setting the progress back to 0
      progPerc = 0;
      console.log("ffmpeg process terminated successfully !");
    };
  } else {
    var command = ffmpeg(inputFilePath)
      .videoCodec("copy")
      .audioCodec("aac")
      .audioChannels(6)
      // .audioBitrate("192k")
      // .addOptions(["-map 0:v:0", `-map 0:a:${language}`])

      // subtitles
      .addOption("-c:s", "mov_text")
      .addOption("-map", "0")
      .addOption("-strict", "-2")

      // .addOptions(["-map 0:v:0", "-map 0:a"])
      .addOptions([
        "-map 0:v:0",
        `${language === "all" ? "-map 0:a" : `-map 0:a:${language}`}`,
      ])
      .on("progress", (progress) => {
        setEncProgPerc(Number.parseFloat(progress.percent).toFixed(2));
        // console.log(Number.parseFloat(progress.percent).toFixed(2));
      })
      .on("end", () => {
        console.log("transcoding finished");
        const completedObj = {
          filename: inputFileName,
          fromCodec: codec,
          toCodec: "libx264",
        };
        setEncProgPerc(0);
        enqueueCompleted(completedObj);
        callback(); // callback to keep encoding even if success or error  occured
      })
      .on("exit", () => {
        console.log("ffmpeg process terminated successfully !!");
      })
      .on("error", (err) => {
        console.error("Error ->", err);
        // obj containing error details
        const errorObj = {
          filename: inputFileName,
          codec: codec,
          error: err,
        };
        enqueueError(errorObj);
        callback(); // callback to keep encoding even if success or error  occured
      })
      .save(outputFilePath);

    // function to kill currently running ffmpeg process
    terminateEncoding = () => {
      command.kill();
      // setting the progress back to 0
      progPerc = 0;
      console.log("ffmpeg process terminated successfully !");
    };
  }
};

export { getEncProgPerc, videoFormatEncoder, terminateEncoding };
