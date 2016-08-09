// Stores data in local storage
var StorageManager = {
 
  get: function(key)
  {
    console.log('[GET] ' + key);
    return window.localStorage.getItem(key);
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