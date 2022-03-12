const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');

const checkCache = (key, callback) => {
  memcached.get(key, callback);
}

const addToCache = function(key, data) {
  memcached.set(key, data, 86400, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Data successfully cached!');
    }
  })
}

const updateCache = function(key, data) {
  memcached.replace(key, data, 86400, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Data successfully cached!');
    }
  })
}

module.exports = {
  'checkCache': checkCache,
  'addToCache': addToCache,
  'updateCache': updateCache
};
