const https = require('https');
const http = require('http');
const { REQUEST_TIMEOUT} = require('../config.json');

const get_options = (url, port, method, body, headers)  => ({
  host: url,
  path: '/',
  method,
  ...(headers ? { headers } : null),
  ...(body ? { body } : null),
  port,
  timeout: REQUEST_TIMEOUT
});

const rest = async (url, port, {method, body, headers}) => {
  const options = get_options(url, port, method, body, headers);
  const protocol = port === 80 ? http : https;
  return new Promise((resolve, reject) => {
    const request = protocol.request(options, (x) => {
      if (x.statusCode === 200 || 301) resolve(true);
      else resolve(false);
    });
    ['timeout','error'].forEach(x => {
      request.on(x, (e) => {
        resolve(false);
      })
    });
    request.end();
  });
};

module.exports = {
  rest
}