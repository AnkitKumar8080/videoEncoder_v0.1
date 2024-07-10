import { getEncProgPerc } from "../services/videoEncoder.js";

// controllers/sseController.js
const writeEvent = (res, sseId, data) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req, res) => {
  // writing teh header to each responses
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    // console.log(JSON.stringify(getEncProgPerc()));
    writeEvent(res, sseId, JSON.stringify(getEncProgPerc()));
  }, 2000);

  writeEvent(res, sseId, JSON.stringify(getEncProgPerc()));
};

export { sendEvent };
