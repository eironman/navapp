var app = {

  formTemplateUrl : "http://www.dereksolutions.com/naval/getForm.php",
  storageDirectory: null,
  testFile        : 'Test.pdf',
  questionType    : {
    'TEXT'   : 1,
    'SELECT' : 2,
    'BOOLEAN': 3
  },

  // Application Constructor
  initialize: function()
  {
    this.bindEvents();
  },

  // Bind Event Listeners
  // events: 'load', 'deviceready', 'offline', and 'online'
  bindEvents: function()
  {
    document.addEventListener('deviceready', this.init, false);
  },

  onFormLoaded: function()
  {
    // Helper.loadView('Login');
    Helper.loadView('FormChecklist', 9);
    // Helper.loadView('FormCategory', 4);
    // Helper.loadView('Documents');
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
    }
  },
  onStorageDirectoryCreated: function(dirEntry)
  {
    app.storageDirectory = dirEntry.toURL();
    console.log('storageDirectory: ' + app.storageDirectory);
    Helper.includeScript('PdfManager');
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

  init: function()
  {
    console.log('Device Type: ' + Helper.getDeviceType());
    Helper.includeScript('FileManager');
    Helper.includeScript('FormManager');
    Helper.includeScript('CategoryManager');
    app.createStorageDirectory();

    if (!FormManager.hasForm()) {
      Helper.loadView('Loading');
      FormManager.getFormTemplate(app.onFormLoaded);
    } else {
      // Helper.loadView('Login');
      Helper.loadView('FormChecklist', 9);
      // Helper.loadView('FormCategory', 4);
      // Helper.loadView('Documents');
    }
  }
};