const COUNTER = new Map();

const get_counter = (id) => {
  if (!COUNTER.has(id)) {
    COUNTER.set(id, {
      success: 0,
      total: 0
    });
  } 
  return COUNTER.get(id);
}

const uptime = (id, status) => {
  let { success, total } = get_counter(id);
  status && (success += 1);
  total += 1;
  COUNTER.set(id, {success, total});
  return `${((success/total) * 100).toFixed(1)} %`;
}

const remove_uptime_counter = (id) => {
  COUNTER.has(id) && COUNTER.delete(id);
}

module.exports = {
  uptime,
  remove_uptime_counter
}