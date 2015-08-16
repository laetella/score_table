var loadEntries = require('./info.js');

function sort(sortKey,sortType) {
  if (sortKey !== 'name') {
    if(sortType === 'true') {
     loadEntries.sort(function(a, b) {
        return a[sortKey] - b[sortKey];
      });
    }  else {
      loadEntries.sort(function(a, b) {
        return b[sortKey] - a[sortKey];
      });
    }
  }
  return loadEntries;
}

module.exports = sort;
