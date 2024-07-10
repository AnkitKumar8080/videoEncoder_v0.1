import { videoFormatEncoder } from "./videoEncoder.js";
let encodeQueue = []; // queue for video encodequeue
let errorQueue = []; // queue to get logs of taskObj that caused error
let completedQueue = []; // containing logs of completed task
let busy = false; // allows only one task to encode(doesn't allow simultaneous task to encode)
let currentEncoding = {};
// function to add processes to queue
function enqueueTask(taskObj) {
  encodeQueue.push(taskObj);
  // Tell the process queue function to pick one task and convert one movie
  processQueue();
}

// function to add error causing taskObj
function enqueueError(errorObj) {
  errorQueue.push(errorObj);
}

// function to add completed taskObj
function enqueueCompleted(completedObj) {
  completedQueue.push(completedObj);
}

function processQueue() {
  if (encodeQueue.length > 0 && !busy) {
    const taskObj = encodeQueue.shift();
    // assigning current encoding queue
    currentEncoding = taskObj;
    busy = true; // blocking other tasks from encoding
    // calling the video encoding function  to convert a particular taskObj(:ie movie);
    videoFormatEncoder(
      taskObj.filename,
      taskObj.encoding,
      taskObj.language,
      () => {
        busy = false; // letting next task to encode
        processQueue(); // continue to encode other task (ie: videos)
      }
    );
  }
}

const getEncodeQueue = () => {
  return encodeQueue;
};

const getCompletedQueue = () => {
  return completedQueue;
};

const getErrorQueue = () => {
  return errorQueue;
};

const getCurrentEncodingQueue = () => {
  return currentEncoding;
};

const rmTaskFromEncodeQueue = (filename) => {
  let newEncodeQueue = encodeQueue.filter((obj) => {
    return obj.filename !== filename;
  });
  encodeQueue = newEncodeQueue;
};

setTimeout(() => {}, 20000);
export {
  enqueueError,
  enqueueTask,
  enqueueCompleted,
  getEncodeQueue,
  getCompletedQueue,
  getErrorQueue,
  getCurrentEncodingQueue,
  rmTaskFromEncodeQueue,
};
