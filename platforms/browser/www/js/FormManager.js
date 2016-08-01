// Stores and retrieves the form
var FormManager = {
  _form          : null,
  formInProgress: null,
  fomDocumentName: 'Test.pdf',

  clearFormInProgress: function()
  {
    // Remove images from the device
    var questions = QuestionManager.getQuestions(this.formInProgress.checklistId);
    var images, storedValue;
    for (var i = 0; i < questions.length; i++) {
      storedValue = QuestionManager.getQuestionStoredValue(questions[i].id);
      if (!Helper.isEmpty(storedValue) && !Helper.isEmpty(storedValue.images)) {
        images = storedValue.images;
        for (var j = 0; j < images.length; j++) {
          FileManager.deleteFile(images[j]);
        }
      }
    }
    
    this.formInProgress = null;
    window.localStorage.removeItem("navalFormInProgress");
    console.log('cleared navalFormInProgress');
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

  // Check if the app has a form
  hasForm: function()
  {
    return this._form !== null;
  },

  // Starts the structure to store a form
  initForm: function(checklistId)
  {
    FormManager.clearFormInProgress();
    this.formInProgress = {
      checklistId: checklistId,
      generated  : false,
      questions  : []
    };
    this.storeForm();
  },

  isFormInProgress: function()
  {
    return (this.formInProgress !== null &&
      this.formInProgress.questions.length > 0 &&
      this.formInProgress.generated === false);
  },

  markAsGenerated: function()
  {
    this.formInProgress.generated = true;
    this.storeForm();
  },

  // Checks if a new form can be started erasing one in progress
  shouldInitForm: function(checklistId, callback)
  {
    if (this.isFormInProgress() && this.formInProgress.checklistId != checklistId) {

      // Ask to delete the form in progress to start a new one
      Helper.showConfirm(
        'Hay un formulario en progreso, si inicia uno nuevo perderá el actual, ¿desea continuar?',
        function(buttonPressed) {
          if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
            FormManager.initForm(checklistId);
            callback();
          }
        }
      );

    } else if (!this.isFormInProgress()) {
      // Start a new one
      FormManager.initForm(checklistId);
      callback();
    } else {
      // The form selected is the one in progress
      callback();
    }
  },

  // Stores the form in local storage
  storeForm: function()
  {
    window.localStorage.setItem('navalFormInProgress', JSON.stringify(this.formInProgress));
  },

  initialize: function()
  {
    var formTemplate = window.localStorage.getItem("navalForm");
    if (formTemplate !== null) {
      this._form = JSON.parse(formTemplate);
    }

    var formInProgress = window.localStorage.getItem("navalFormInProgress");
    if (formInProgress !== null) {
      this.formInProgress = JSON.parse(formInProgress);
    }
  }
};

FormManager.initialize();