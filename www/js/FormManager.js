// Stores and retrieves the form
var FormManager = {
  _form          : null,
  _formInProgress: null,
  fomDocumentName: 'Test.pdf',

  hasForm: function()
  {
    return this._form !== null;
  },

  isFormInProgress: function()
  {
    return (this._formInProgress !== null &&
      this._formInProgress.questions.length > 0 &&
      this._formInProgress.generated === false);
  },

  // Checks if a new form can be started erasing one in progress
  shouldInitForm: function(id, callback)
  {
    console.log('isFormInProgress: ' + this.isFormInProgress());
    console.log('id: ' + id);
    console.log(this._formInProgress);
    if (this.isFormInProgress() && this._formInProgress.id != id) {

      Helper.showConfirm(
        'Hay un formulario en progreso, si inicia uno nuevo perderá el actual, ¿desea continuar?',
        function(buttonPressed) {
          if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
            FormManager.initForm(id);
            callback();
          }
        }
      );

    } else {
      FormManager.initForm(id);
      callback();
    }
  },

  // Starts the structure to store a form
  initForm: function(id)
  {
    FormManager.clearFormInProgress();
    this._formInProgress = {
      id       : id,
      generated: false,
      questions: []
    };
    window.localStorage.setItem('navalFormInProgress', JSON.stringify(this._formInProgress));
  },

  clearFormInProgress: function()
  {
    this._formInProgress = null;
    window.localStorage.removeItem("navalFormInProgress");
    console.log('cleared navalFormInProgress');
  },

  // Stores the value of a form field
  storeFieldValue: function(fieldId)
  {

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

    var formInProgress = window.localStorage.getItem("navalFormInProgress");
    if (formInProgress !== null) {
      this._formInProgress = JSON.parse(formInProgress);
    }
  }
};

FormManager.initialize();