// Stores and retrieves the form
var FormManager = {
  form           : null,
  formInProgress : null,
  tripInfo       : null,

  getFormInProgressId: function()
  {
    return this.formInProgress.checklistId;
  },

  // Check if the app has a form
  hasForm: function()
  {
    return this.form !== null;
  },

  // Starts the structure to store a form
  initForm: function(checklistId)
  {
    FormManager.removeStoredFormInProgress();
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
    this.form = null;
    StorageManager.remove('navalForm');
  },

  removeStoredFormInProgress: function()
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
    }

    StorageManager.remove('navalFormInProgress');
  },

  removeStoredTrip: function()
  {
    this.tripInfo = null;
    StorageManager.remove('navalTripInfo');
  },

  // Removes an image stored in local storage and the device
  removeStoredImage: function(imgUri, questionId, callback)
  {
    var questionIndex = QuestionManager.isQuestionAnswered(questionId);
    if (questionIndex !== null) {
      var images, storedValue;
      storedValue = QuestionManager.getQuestionStoredValue(questionId);
      if (!Helper.isEmpty(storedValue.images)) {
        images = storedValue.images;
        for (var j = 0; j < images.length; j++) {
          if (images[j] == imgUri) {

            // Remove from local storage
            FormManager.formInProgress.questions[questionIndex].images.splice(j, 1);
            FormManager.formInProgress.questions[questionIndex].imagesBase64.splice(j, 1);
            FormManager.storeForm();

            // TODO: Remove question from storage if it's empty after removing image
            
            // Remove from device
            FileManager.deleteFile(imgUri, callback);
            break;
          }
        }
      }
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
    StorageManager.set('navalFormInProgress', JSON.stringify(this.formInProgress));
  },

  storeTrip: function(navigationNumber, date, captain)
  {
    this.tripInfo = {
      navigationNumber: navigationNumber,
      date            : date,
      captain         : captain
    }
    StorageManager.set('navalTripInfo', JSON.stringify(this.tripInfo));
  },

  initialize: function()
  {
    // Retrieve form from local storage
    var formTemplate = StorageManager.get('navalForm');
    if (formTemplate !== null) {
      this.form = JSON.parse(formTemplate);
    }

    // Retrieve a form in progress from local storage
    var formInProgress = StorageManager.get('navalFormInProgress');
    if (formInProgress !== null) {
      this.formInProgress = JSON.parse(formInProgress);
    }

    // Retrieve trip info from local storage
    var tripInfo = StorageManager.get('navalTripInfo');
    if (tripInfo !== null) {
      var tripInfo = JSON.parse(tripInfo);

      // Removes the date stored by the user in a previous session
      this.storeTrip(tripInfo.navigationNumber, null, tripInfo.captain);
    }
  }
};

FormManager.initialize();