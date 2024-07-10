import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import metadataRoute from "./routes/metadataRoute.js";
import videoEncodeRoute from "./routes/videoEncodeRoute.js";
import authRoute from "./routes/authRoute.js";
import rmQueueRoute from "./routes/rmQueueRoute.js";
import cors from "cors";
import checkDir from "./services/checkFolder.js";
const app = express();

//middlewares
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// checking / creating all required folder for storing videos

const dirPathMedia = "./media";
const dirPathVideo = "./media/videos";
const dirPathMp4 = "./media/videos/mp4";

checkDir(dirPathMedia);
checkDir(dirPathVideo);
checkDir(dirPathMp4);

//variables
const PORT = process.env.PORT;

// routes
app.use("/api/v1/metadata", metadataRoute);
app.use("/api/v1/videoencode", videoEncodeRoute);
app.use("/api/v1/login", authRoute);
app.use("/api/v1/removeFromQueue", rmQueueRoute);

app.listen(PORT, () => {
  console.log("server started at port " + PORT);
});
