// Stores and retrieves the form
var FormManager = {
  _form          : null,
  _formInProgress: null,
  fomDocumentName: 'Test.pdf',

  hasForm: function() {
    return this._form !== null;
  },

  isFormInProgress: function() {
    return this._formInProgress !== null;
  },

  // Call to get the form template from the server
  getFormTemplate: function(callback) {
    var self = this;
    try {
      $.ajax({
        url: app.formTemplateUrl
      })
      .done(function(formJSON) {
        self._form = JSON.parse(formJSON);
        window.localStorage.setItem("navalForm", formJSON);
        if (typeof callback !== 'undefined') {
          callback();
        }
      })
      .fail(function(jqxhr, settings, exception) {
        console.warn( "Fail: " + exception );
        Helper.loadView('Error');
      });
    } catch (e) {
      // try-catch to handle ERR_CONNECTION_REFUSED
      console.warn("Catch: " + exception );
      Helper.loadView('Error');
    }
  },

  initialize: function() {
    var formTemplate = window.localStorage.getItem("navalForm");
    if (formTemplate !== null) {
      this._form = JSON.parse(formTemplate);
    }
  }
};

FormManager.initialize();