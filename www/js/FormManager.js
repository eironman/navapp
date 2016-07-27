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
  shouldInitForm: function(checklistId, callback)
  {
    if (this.isFormInProgress() && this._formInProgress.id != checklistId) {

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

  // Starts the structure to store a form
  initForm: function(checklistId)
  {
    FormManager.clearFormInProgress();
    this._formInProgress = {
      id       : checklistId,
      generated: false,
      questions: []
    };
    this.storeForm();
  },

  // Stores the form in local storage
  storeForm: function()
  {
    window.localStorage.setItem('navalFormInProgress', JSON.stringify(this._formInProgress));
  },

  clearFormInProgress: function()
  {
    this._formInProgress = null;
    window.localStorage.removeItem("navalFormInProgress");
    console.log('cleared navalFormInProgress');
  },

  // Stores the value of a boolean field
  storeBoolean: function(questionId, value)
  {
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      var field = {
        id     : questionId,
        boolean: value,
        text   : null,
        images : []
      }
      this._formInProgress.questions.push(field);

    } else {
      this._formInProgress.questions[questionIndex].boolean = value;
    }

    this.storeForm();
  },

  // Stores the value of a text field
  storeText: function(questionId, value)
  {
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      var field = {
        id     : questionId,
        boolean: null,
        text   : value,
        images : []
      }
      this._formInProgress.questions.push(field);

    } else {
      this._formInProgress.questions[questionIndex].text = value;
    }

    this.storeForm();
  },

  /**
  * Returns the index of the question stored in the answers
  * If the question is not answered, returns null
  **/
  isQuestionAnswered: function(questionId)
  {
    var questionIndex = null;
    for (var i = 0; i < this._formInProgress.questions.length; i++) {
      if (this._formInProgress.questions[i].id == questionId) {
        questionIndex = i;
        break;
      }
    }

    return questionIndex;
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