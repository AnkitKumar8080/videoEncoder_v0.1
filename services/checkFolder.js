import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// check for directory media -> video -> mp4

const checkDir = (dirPath) => {
  if (!fs.existsSync(path.join(__dirname, dirPath))) {
    // if theres no media dir in root create it
    fs.mkdirSync(path.join(__dirname, dirPath), { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creatign directory ${dirPath} : ${err}`);
      }
    });
  }
};

export default checkDir;
