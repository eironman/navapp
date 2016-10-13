// Stores and retrieves the questions
var QuestionManager = {
  TYPE_BOOLEAN   : 1,
  TYPE_TEXT      : 2,
  TYPE_SELECT    : 3,

  // Returns questions of a category
  getQuestions: function(checklistId)
  {
    var checklist = CategoryManager.getCategory(checklistId);
    if (checklist !== null) {
      return checklist.questions;
    }

    return [];
  },

  // Returns the value in local storage
  getQuestionStoredValue: function(questionId)
  {
    var value = null;
    if (FormManager.formInProgress !== null) {
      for (var i = 0; i < FormManager.formInProgress.questions.length; i++) {
        if (FormManager.formInProgress.questions[i].id == questionId) {
          value = FormManager.formInProgress.questions[i];
          break;
        }
      }
    }

    return value;
  },

  // Returns the type of a question
  getQuestionType: function(questionId)
  {
    var type = null;
    if (FormManager.formInProgress !== null) {
      var questions = this.getQuestions(FormManager.formInProgress.checklistId);
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].id === questionId) {
          type = questions[i].type;
          break;
        }
      }
    }

    return type;
  },

  /**
  * Returns the index of the question stored in the answers
  * If the question is not answered, returns null
  **/
  isQuestionAnswered: function(questionId)
  {
    var questionIndex = null;
    if (FormManager.formInProgress !== null) {
      for (var i = 0; i < FormManager.formInProgress.questions.length; i++) {
        if (FormManager.formInProgress.questions[i].id == questionId) {
          questionIndex = i;
          break;
        }
      }
    }

    return questionIndex;
  },

  // Stores the value of a boolean question
  storeBoolean: function(questionId, boolean, text, image)
  {
    text = text || null;
    image = image || null;
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New question
      var question = {
        id          : questionId,
        boolean     : boolean,
        text        : text,
        images      : [],
        imagesBase64: []
      };
      if (image !== null) {
        this.addImageToQuestion(question, image);
      }
      
      FormManager.formInProgress.questions.push(question);

    } else {
      // Update question
      if (image !== null) {
        this.addImageToQuestion(FormManager.formInProgress.questions[questionIndex], image);
      } else if (text !== null) {
        FormManager.formInProgress.questions[questionIndex].text = text;
      } else {
        FormManager.formInProgress.questions[questionIndex].boolean = boolean;
      }
    }

    // Delay for images to convert to Base64
    setTimeout(function() {
      FormManager.storeForm();
    }, 100);
  },

  // Stores the value of a select question
  storeSelect: function(questionId, value)
  {
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New question
      var question = {
        id   : questionId,
        value: value
      };
      FormManager.formInProgress.questions.push(question);

    } else {
      // Update question
      FormManager.formInProgress.questions[questionIndex].value = value;
    }

    FormManager.storeForm();
  },

  // Stores the value of a text question
  storeText: function(questionId, text, image)
  {
    image = image || null;
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New question
      var question = {
        id          : questionId,
        text        : text,
        images      : [],
        imagesBase64: []
      };
      if (image !== null) {
        this.addImageToQuestion(question, image);
      }
      FormManager.formInProgress.questions.push(question);

    } else {
      // Update question
      if (image !== null) {
        this.addImageToQuestion(FormManager.formInProgress.questions[questionIndex], image);
      } else {
        FormManager.formInProgress.questions[questionIndex].text = text;
      }
    }

    // Delay for images to convert to Base64
    setTimeout(function() {
      FormManager.storeForm();
    }, 100);
  },

  addImageToQuestion: function(question, image)
  {
    if (!Helper.arrayContains(question.images, image)) {
      question.images.push(image);
    }

    // Conver to base64 for pdf
    Helper.toDataUrl(image, function(dataURL) {
      question.imagesBase64.push(dataURL);
    }, 'image/jpg');
  }
};
