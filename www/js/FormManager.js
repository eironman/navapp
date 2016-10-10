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
        LocaleManager.get('confirmNewForm'),
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

  // Stores trip info in local storage and creates the folder to store documents
  storeTrip: function(navigationNumber, captain, boat)
  {
    this.tripInfo = {
      navigationNumber: navigationNumber,
      captain         : captain,
      boat            : boat
    }
    StorageManager.set('navalTripInfo', JSON.stringify(this.tripInfo));
  },

  initialize: function()
  {
    // Retrieve form from local storage
    this.form = StorageManager.get('navalForm', true);

    // Retrieve a form in progress from local storage
    this.formInProgress = StorageManager.get('navalFormInProgress', true);

    // Retrieve trip info from local storage
    this.tripInfo = StorageManager.get('navalTripInfo', true);
  }
};

FormManager.initialize();