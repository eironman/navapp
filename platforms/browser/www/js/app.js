var app = {

  formTemplateUrl: "http://www.dereksolutions.com/naval/getForm.php",
  questionType: {
    'TEXT'   : 1,
    'SELECT' : 2,
    'BOOLEAN': 3
  },

  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  // events: 'load', 'deviceready', 'offline', and 'online'
  bindEvents: function() {
    document.addEventListener('deviceready', this.init, false);
  },
  onFormLoaded: function() {
    // Helper.loadView('Login');
    Helper.loadView('FormCategory');
  },
  init: function() {
    Helper.includeScript('FormManager');
    Helper.includeScript('CategoryManager');

    if (!FormManager.hasForm()) {
      Helper.loadView('Loading');
      FormManager.getFormTemplate(app.onFormLoaded);
    } else {
      // Helper.loadView('Login');
      Helper.loadView('FormCategory');
    }
  }
};