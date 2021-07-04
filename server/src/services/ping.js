const net = require("net");
const { REQUEST_TIMEOUT} = require('../config.json');

const ping = ({uri, port}) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.connect({ port, host: uri},() => {
      socket.end();
      resolve(true);
    });
    socket.setTimeout(REQUEST_TIMEOUT);
    ['timeout','error'].forEach(x => {
      socket.on(x, () => {
        socket.end();
        resolve(false);
      })
    });
  });
}

module.exports = {
    ping
}