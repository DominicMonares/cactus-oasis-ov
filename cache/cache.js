var cache = {};

var checkCache = (key) => {
  if (cache[key]) {
    return cache[key];
  }

  return false;
}

var createCache = (key, value) => {
  cache[key] = value;
}

module.exports = {
  'cache': cache,
  'checkCache:': checkCache,
  'createCache': createCache
};
