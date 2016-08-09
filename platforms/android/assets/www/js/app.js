var app = {

  clientDataUrl   : "http://www.dereksolutions.com/navapp/jsonclientes",
  formTemplateUrl : "http://www.dereksolutions.com/navapp/jsonpreguntas",
  loginUrl        : "http://www.dereksolutions.com/navapp/node/12",
  sendPdfUrl      : "http://www.in.mallorcaparquet.com/pdf.php",
  loggedUser      : null,
  questionType    : {
    'TEXT'   : 1,
    'SELECT' : 2,
    'BOOLEAN': 3
  },
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
      RequestManager.loadView('Home', {requestForm: true});
    } else {
      RequestManager.loadView('Login');
    }
  },
  
  // Gets the stored user from the local storage
  loadStoredUser: function()
  {
    this.loggedUser = window.localStorage.getItem("navalUser");
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
    window.localStorage.removeItem("navalUser");
  },

  // Stores the user in local storage
  storeLoggedUser: function(user)
  {
    this.loggedUser = user;
    window.localStorage.setItem("navalUser", user);
  },

  init: function()
  {
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