const lowdb = require("lowdb");
const Filesync = require("lowdb/adapters/FileSync");
const path = require("path");

const adapter = new Filesync(`${path.dirname(__dirname)}/database/db.json`);
const database = lowdb(adapter);
database.defaults({ jobs: [] }).write();

const _get = (name) => {
  return _all().find({ name });
};

const _all = () => {
  return database.get("jobs").cloneDeep();
};

const all = () => _all().value();
const get = (name) => _get(name).value();
const remove = (name) => {
  database.get("jobs").remove({name}).write();
} 
const update = (name, params) => {
  database.get("jobs").find({name}).assign(params).write();
}
const add = (entity) => {
  database.get("jobs").push(entity).write();
}


module.exports = {
  all,
  add,
  remove,
  update,
  get,
};
