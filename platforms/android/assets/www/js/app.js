var app = {

  loggedUser      : null,
  storageDirectory: null,

  // Fixes the iOS bug where the application is over the status bar
  applyIosOffset: function()
  {
    if (Helper.isIOs()) {
      $(".app").addClass("ios");
    }
  },

  // Bind Event Listeners
  // events: 'load', 'deviceready', 'offline', and 'online'
  bindEvents: function()
  {
    document.addEventListener('deviceready', this.init, false);
  },

  /**
  * Creates the directory to store the pdf files
  **/
  createStorageDirectory: function()
  {
    if (!Helper.isBrowser()) {
      window.resolveLocalFileSystemURL(
        Helper.mobileDeviceStorageDirectory(),
        function onFsLoad(dirEntry) {
          FileManager.createDirectory(dirEntry, 'Navapp', app.onStorageDirectoryCreated);
        },
        function onErrorLoadFs(error) {
          console.log('resolveLocalFileSystemURL error:');
          console.log(error);
        }
      );
    } else {
      // To avoid js error in browser, just for testing because the app is not
      // meant to work properly in a browser
      RequestManager.includeScript('PdfManager');
    }
  },

  isUserLogged: function()
  {
    return this.loggedUser !== null;
  },

  /**
  * Loads the html content into the page
  **/
  loadHtmlContent: function(html)
  {
    $(".app")
      .html(html)
      .trigger('htmlContentLoaded')
      .off('htmlContentLoaded');
  },

  // Loads login or home page
  loadInitialScreen: function()
  {
    if (app.isUserLogged()) {
      // RequestManager.loadView('Documents');
      // RequestManager.loadView('FormCategory', 4);
      // RequestManager.loadView('FormChecklist', 10);
      RequestManager.loadView('Home', {requestData: true});
    } else {
      RequestManager.loadView('Login');
    }
  },
  
  // Gets the stored user from the local storage
  loadStoredUser: function()
  {
    this.loggedUser = StorageManager.get("navalUser");
  },

  onStorageDirectoryCreated: function(dirEntry)
  {
    app.storageDirectory = dirEntry.toURL();
    console.log('storageDirectory: ' + app.storageDirectory);
    RequestManager.includeScript('PdfManager');
  },

  // Removes the stored user from the local storage
  removeStoredUser: function()
  {
    this.loggedUser = null;
    StorageManager.remove("navalUser");
  },

  // Stores the user in local storage
  storeLoggedUser: function(user)
  {
    this.loggedUser = user;
    StorageManager.set("navalUser", user);
  },

  init: function()
  {
    RequestManager.includeScript('StorageManager');
    RequestManager.includeScript('FileManager');
    RequestManager.includeScript('CategoryManager');
    RequestManager.includeScript('QuestionManager');
    RequestManager.includeScript('DataParser');
    RequestManager.includeScript('FormManager');

    app.applyIosOffset();
    app.createStorageDirectory();
    app.loadStoredUser();
    app.loadInitialScreen();
  },

  // Application Constructor
  initialize: function()
  {
    this.bindEvents();
  }
};