const function_pipe = ({ init, func }) => {
  return func.reduce((a, c) => c(a), init);
};

const transform_rest = ({uri, port, job}) => {
  const { worker } = job
  const { body, header } = worker.workerData;

  return {
    url: uri,
    config: {
      method: body ? "POST" : "GET",
      ...(header ? { header: JSON.parse(header) } : null),
      ...(body ? { data: JSON.parse(body) } : null),
    },
    port
  }
};

const transform_database = (jobs) => jobs.map(({name, interval, enabled, worker}) =>  {
  const { port, uri } = worker.workerData;
  return {
    id: name,
    schedule: interval,
    last_ping_time: null,
    port,
    uri,
    enabled,
    available: enabled ? 4 : 2
  }
});

module.exports = {
  function_pipe,
  transform_rest,
  transform_database
};
