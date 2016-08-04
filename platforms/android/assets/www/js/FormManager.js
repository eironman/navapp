// Stores and retrieves the form
var FormManager = {
  form           : null,
  formInProgress : null,
  tripInfo       : null,
  fomDocumentName: 'Test.pdf',

  getFormInProgressId: function()
  {
    return this.formInProgress.checklistId;
  },

  // Call to get the form template from the server
  getFormTemplate: function(callback) {
    var self = this;
    try {
      $.ajax({
        url: app.formTemplateUrl
      })
      .done(function(formJSON) {
        self.form = JSON.parse(formJSON);
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
    return this.form !== null;
  },

  // Starts the structure to store a form
  initForm: function(checklistId)
  {
    FormManager.removeStoredForm();
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

  removeStoredForm: function()
  {
    if (this.formInProgress !== null) {
      
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
    }
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

  storeTrip: function(navigationNumber, date, captain)
  {
    this.tripInfo = {
      navigationNumber: navigationNumber,
      date            : date,
      captain         : captain
    }
    window.localStorage.setItem('navalTripInfo', JSON.stringify(this.tripInfo));
  },

  initialize: function()
  {
    // Retrieve form from local storage
    var formTemplate = window.localStorage.getItem("navalForm");
    if (formTemplate !== null) {
      this.form = JSON.parse(formTemplate);
    }

    // Retrieve a form in progress from local storage
    var formInProgress = window.localStorage.getItem("navalFormInProgress");
    if (formInProgress !== null) {
      this.formInProgress = JSON.parse(formInProgress);
    }

    // Retrieve trip info from local storage
    var tripInfo = window.localStorage.getItem("navalTripInfo");
    if (tripInfo !== null) {
      this.tripInfo = JSON.parse(tripInfo);
    }
  }
};

FormManager.initialize();