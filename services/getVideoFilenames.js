import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// initializing path of videos containing folder
const directoryPath = path.join(__dirname, "../media/videos/");

// readdirSync blocks event loop later in future can also use promise to handle this
export function getFilename() {
  try {
    const files = fs.readdirSync(directoryPath);
    // filter the all video files and select only mkv format files
    const videoFiles = files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      // the array can be updated in future version to also convert other video formats
      return [".mkv"].includes(fileExtension);
    });
    return videoFiles;
  } catch (error) {
    console.error("Error reading directory : ", error);
    return [];
  }
}

// console.log(getFilename());
