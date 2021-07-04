const { parentPort, workerData } = require("worker_threads");
const { transform_rest } = require("./shared");
const { rest } = require('../services/rest');

(async () => {
  const result = transform_rest(workerData);
  const {url, port, config} = result;
  let success = false;
  try {
    success = await rest(url, port, {...config});
  } catch (err) {}
  if (parentPort) {
    parentPort.postMessage(success);
    parentPort.postMessage('done');
  }
  else process.exit(0)
})();