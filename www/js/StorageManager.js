// Stores data in local storage
var StorageManager = {
 
  get: function(key, parseJson)
  {
    console.log('[GET] ' + key);
    parseJson = parseJson || false;

    var value = window.localStorage.getItem(key);
    if (parseJson) {
      value = JSON.parse(value);
    }
    
    return value;
  },

  remove: function(key)
  {
    window.localStorage.removeItem(key);
    console.log('[DELETE] ' + key);
  },

  set: function(key, value) {
    window.localStorage.setItem(key, value);
    console.log('[SET] ' + key + ' - ' + value);
  }
}