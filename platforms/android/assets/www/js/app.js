var app = {

  loggedUser          : null,
  storageDirectory    : null, // app directory
  userStorageDirectory: null, // app directory + boat folder
  page                : null, // view loaded

  // Fixes the iOS bug where the application is over the status bar
  applyIosOffset: function()
  {
    if (Helper.isIOs()) {
      $(".app").addClass("ios");
    }
  },

  // Translates the language keys
  applyLocale: function(content)
  {
    var regExp = /--(\w+)--/g;
    var match;
    while (match = regExp.exec(content)) {
      content = content.replace(match[0], LocaleManager.get(match[1]));
    }

    return content;
  },

  // Applies common cotent for all the views
  applyTemplate: function(content)
  {
    // Bottom menu
    var menu = Menu.render();
    content += menu;

    // Continue form
    RequestManager.includeScript('views/partials/ContinueForm');
    ContinueForm.render();

    return content;
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
          console.error('[CREATE DIRECTORY] resolveLocalFileSystemURL error:');
          console.error(error);
        }
      );
    } else {
      // To avoid js error in browser, just for testing because the app is not
      // meant to work properly in a browser
      RequestManager.includeScript('PdfManager');
    }
  },

  createUserStorageDirectory: function(userFolder)
  {
    if (!Helper.isBrowser()) {
      window.resolveLocalFileSystemURL(
        app.storageDirectory,
        function onFsLoad(dirEntry) {
          FileManager.createDirectory(dirEntry, userFolder, app.onUserStorageDirectoryCreated);
        },
        function onErrorLoadFs(error) {
          console.error('[CREATE DIRECTORY] resolveLocalFileSystemURL error:');
          console.error(error);
        }
      );
    }
  },

  inHome: function()
  {
    return app.page === 'Home';
  },

  isProfileComplete: function()
  {
    var tripInfo = StorageManager.get('navalTripInfo', true);
    if (
      !Helper.isEmpty(tripInfo) &&
      !Helper.isEmpty(tripInfo.navigationNumber) &&
      !Helper.isEmpty(tripInfo.captain) &&
      !Helper.isEmpty(tripInfo.boat)
    ) {
      return true;
    }
    return false;
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
    if (app.page !== 'Login') {
      html = this.applyTemplate(html);
    }
    html = this.applyLocale(html);
    $(".app")
      .html(html)
      .trigger('htmlContentLoaded')
      .off('htmlContentLoaded');
  },

  /**
  * Ask the user confirmation to logout
  **/
  confirmLogout: function()
  {
    // Message to confirm logout
    var confirmationMessage = LocaleManager.get('confirmLogout');
    if (FormManager.isFormInProgress()) {
      confirmationMessage = LocaleManager.get('confirmLogoutInProgress');
    }

    Helper.showConfirm(
      confirmationMessage,
      function(buttonPressed) {
        if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
          app.logout();
        }
      }
    );
  },

  // Loads initial screen after login
  loadHome: function(user)
  {
    // User comes from login
    if (!Helper.isEmpty(user)) {
      app.storeLoggedUser(user);
    }

    Helper.showLoader(LocaleManager.get('checkingUser'));

    // Client info
    RequestManager.getClientInfo(function(client) {
      
      Helper.hideLoader();
      
      // Set app lang
      LocaleManager.setLang(client.Idioma);
      
      Helper.showLoader(LocaleManager.get('gettingForm'));

      // Retrieve form template
      RequestManager.getFormTemplate(function() {
        
        Helper.hideLoader();

        // Load view
        // RequestManager.loadView('Documents');
        // RequestManager.loadView('FormCategory', 4);
        // RequestManager.loadView('FormChecklist', 10);
        RequestManager.loadView('Home');
      })
    });
  },

  // Loads login or home page
  loadInitialScreen: function()
  {
    if (app.isUserLogged()) {
      app.loadHome();
    } else {
      RequestManager.loadView('Login');
    }
  },
  
  // Gets the stored user from the local storage
  loadStoredUser: function()
  {
    this.loggedUser = StorageManager.get('navalUser');
  },

  /**
  * User login
  **/
  login: function(user, password)
  {
    RequestManager.login(
      user,
      password,
      app.loadHome
    );
  },

  /**
  * Logout from the app
  **/
  logout: function()
  {
    app.removeStoredUser();
    FormManager.removeStoredTrip();
    FormManager.removeStoredForm();
    FormManager.removeStoredFormInProgress();
    StorageManager.remove('navalClient');
    RequestManager.loadView('Login');
  },

  // Callback when storage directory is created
  onStorageDirectoryCreated: function(dirEntry)
  {
    app.storageDirectory = dirEntry.toURL();
    console.log('storageDirectory: ' + app.storageDirectory);
    
    // Build user storage directory
    var tripInfo = StorageManager.get('navalTripInfo', true);
    if (tripInfo !== null) {
      app.userStorageDirectory = app.storageDirectory + tripInfo.boat + '/';
      console.log('userStorageDirectory: ' + app.userStorageDirectory);
    }

    RequestManager.includeScript('PdfManager');
  },

  // Callback when user storage directory is created
  onUserStorageDirectoryCreated: function(dirEntry)
  {
    app.userStorageDirectory = dirEntry.toURL();
    console.log('userStorageDirectory: ' + app.userStorageDirectory);
    PdfManager.loadPdfList();
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
    navigator.splashscreen.show();
    RequestManager.includeScript('StorageManager');
    RequestManager.includeScript('LocaleManager');
    RequestManager.includeScript('FileManager');
    RequestManager.includeScript('CategoryManager');
    RequestManager.includeScript('QuestionManager');
    RequestManager.includeScript('DataParser');
    RequestManager.includeScript('FormManager');
    RequestManager.includeScript('views/partials/Menu');

    app.applyIosOffset();
    app.createStorageDirectory();
    app.loadStoredUser();
    app.loadInitialScreen();
    navigator.splashscreen.hide();
  },

  // Application Constructor
  initialize: function()
  {
    this.bindEvents();
  }
};