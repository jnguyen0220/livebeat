const Bree = require("bree");

class BreeManager {
  constructor(jobs, messageHandler, errorHandler) {
    this._bree = new Bree({
      root: false,
      jobs,
      workerMessageHandler: messageHandler,
      errorHandler
    });
  }

  get bree() {
    return this._bree;
  }

  job_by_name(name) {
    return this._bree.config.jobs.find(x => x.name === name);
  }

  stop(name) {
    this._bree.stop(name);
  }

  start(name) {
    this._bree.start(name);
  }

  run(name) {
    this._bree.run(name);
  }

  remove(name) {
    this._bree.remove(name);
  }

  add(item) {
    this._bree.add(item);
    item.forEach((x) => this._bree.start(x.name));
  }
}

module.exports = {
  BreeManager,
};
