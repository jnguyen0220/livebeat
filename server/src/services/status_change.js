const CHANGE = new Map();

const get_change = (id, status) => {
  if (!CHANGE.has(id)) {
    CHANGE.set(id, { last_status: status, timestamp: Date.now()});
  } 
  return CHANGE.get(id);
}

const status_change = (id, status) => {
    let { last_status, timestamp } = get_change(id, status);
    if (status !== last_status) {
        timestamp = Date.now();
        CHANGE.set(id, { last_status: status, timestamp});
    }
    return timestamp;
}

const remove_change_counter = (id) => {
    CHANGE.has(id) && CHANGE.delete(id);
}

module.exports = {
    status_change,
    remove_change_counter
}