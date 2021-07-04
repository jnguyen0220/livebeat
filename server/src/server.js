const express = require('express');
const app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
require("dotenv").config();
const db = require("./services/database");
const Graceful = require("@ladjs/graceful");
const { BreeManager } = require("./services/bree_svc");
const { transform_database } = require("./jobs/shared");
const { v4: uuidv4 } = require("uuid");
const { uptime, remove_uptime_counter } = require("./services/uptime");
const { status_change, remove_change_counter } = require("./services/status_change");

const { PORT } = process.env;
const _ONLINE_SINCE = Date.now();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const jobs = db.all().map(x => ({ ...x, path: `${__dirname}/jobs/${x.path}` }));
const active_jobs = db.all().filter(x => x.enabled).map(x => x.name);

const onMessage = ({ name, message }) => {
  if (message !== 'done') {
    const item = db.get(name);
    item && item.enabled && io.emit("result", { 
      id: name, 
      last_ping_time: Date.now(),
      enabled: true, 
      uptime: uptime(name, message),
      status_change: status_change(name, message),
      protocol: item.path === 'ping_job.js' ? 'tcp' : 'http(s)', 
      available: message ? 3 : 1
    });
  }
};

const onError = (error, workerMetadata) => {
  //const {name: id} = workerMetadata
  // io.emit("result", { id, last_ping_time: Date.now(), enabled: true, available: 1});
}

const breeManager = new BreeManager(jobs, onMessage, onError);

const graceful = new Graceful({ brees: [breeManager.bree] });
graceful.listen();
active_jobs.forEach(x => breeManager.start(x));

const onDisabled = ({id, enabled}) => {
  db.update(id, {enabled});
  if (enabled) {
    breeManager.start(id);
    remove_change_counter(id);
    remove_uptime_counter(id);
  } else {
    breeManager.stop(id);
  }
  io.emit("disabled", { 
    id, 
    enabled, 
    last_ping_time: Date.now(), 
    available: enabled ? 4 : 2 
  });
}

const onAdd = ({taskType, source, port, schedule, method}) => {
  const id = uuidv4();
  const entity = {
    name: id,
    path: taskType === "PING" ? "ping_job.js" : "rest_job.js",
    interval: schedule,
    enabled: true,
    worker: {
      workerData: {
        uri: source,
        port: Number(port),
        ...(method && {method})
      }
    }
  }
  const bree_path = `${__dirname}/jobs/${entity.path}`;
  db.add(entity);
  breeManager.add([{...entity, path: bree_path}]);
  io.emit('add', { available: 4, id, uri: source, enabled: true, port, schedule });
}

const onRemove = (ids) => {
  ids.forEach(x => {
    breeManager.remove(x);
    db.remove(x);
    remove_uptime_counter(x);
  });
  io.emit('remove', { ids });
}

io.on("connection", (socket) => {
  console.log("connection established");
  socket.emit("welcome", { 
    message: transform_database(db.all()), 
    online_since: _ONLINE_SINCE
  });
  [
    { topic: 'disabled', func: onDisabled },
    { topic: 'add', func: onAdd },
    { topic: 'remove', func: onRemove }
  ].forEach(x => socket.on(x.topic, x.func));
});

http.listen(PORT, () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
