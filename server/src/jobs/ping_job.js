const {ping} = require("../services/ping");
const { parentPort, workerData } = require("worker_threads");

(async () => {
  let success = false;
  try {
    success = await ping(workerData);
  } catch (err) {}
  if (parentPort) {
    parentPort.postMessage(success);
    parentPort.postMessage('done');
  }
  else process.exit(0);
})();


