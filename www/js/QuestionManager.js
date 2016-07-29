// Stores and retrieves the questions
var QuestionManager = {
  TYPE_BOOLEAN   : 1,
  TYPE_TEXT      : 2,
  TYPE_SELECT    : 3,

  // Returns questions of a category
  getQuestions: function(checklistId)
  {
    var data = [
      {
        id      : 1,
        type    : 1,
        question: '¿Ha suministrado la mercancía solicitada?'
      },
      {
        id      : 2,
        type    : 2,
        question: '¿La mercancía que porta es de la calidad pactada con la empresa?'
      },
      {
        id      : 3,
        type    : 3,
        question: '¿Qué tipo de mercancía es?',
        options : ['Peligrosa', 'Muy Peligrosa']
      },
      {
        id      : 4,
        type    : 1,
        question: '¿Son los artículos de las marcas autorizadas?'
      }];

      return data;
  },

  // Returns the value in local storage
  getQuestionStoredValue: function(questionId)
  {
    var value = null;
    for (var i = 0; i < FormManager.formInProgress.questions.length; i++) {
      if (FormManager.formInProgress.questions[i].id == questionId) {
        value = FormManager.formInProgress.questions[i];
        break;
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
    for (var i = 0; i < FormManager.formInProgress.questions.length; i++) {
      if (FormManager.formInProgress.questions[i].id == questionId) {
        questionIndex = i;
        break;
      }
    }

    return questionIndex;
  },

  // Stores the value of a boolean field
  storeBoolean: function(questionId, boolean, text, image)
  {
    text = text || null;
    image = image || null;
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New field
      var field = {
        id     : questionId,
        boolean: boolean,
        text   : text,
        images : []
      };
      if (image !== null) {
        field.images.push(image);
      }
      
      FormManager.formInProgress.questions.push(field);

    } else {
      // Update field
      if (image !== null) {
        FormManager.formInProgress.questions[questionIndex].images.push(image);
      } else if (text !== null) {
        FormManager.formInProgress.questions[questionIndex].text = text;
      } else {
        FormManager.formInProgress.questions[questionIndex].boolean = boolean;
      }
    }

    FormManager.storeForm();
  },

  // Stores the value of a select field
  storeSelect: function(questionId, value)
  {
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New field
      var field = {
        id   : questionId,
        value: value
      };
      FormManager.formInProgress.questions.push(field);

    } else {
      // Update field
      FormManager.formInProgress.questions[questionIndex].value = value;
    }

    FormManager.storeForm();
  },

  // Stores the value of a text field
  storeText: function(questionId, text, image)
  {
    image = image || null;
    var questionIndex = this.isQuestionAnswered(questionId);
    if (questionIndex === null) {
      
      // New field
      var field = {
        id     : questionId,
        text   : text,
        images : []
      };
      if (image !== null) {
        field.images.push(image);
      }
      FormManager.formInProgress.questions.push(field);

    } else {
      // Update field
      if (image !== null) {
        FormManager.formInProgress.questions[questionIndex].images.push(image);
      } else {
        FormManager.formInProgress.questions[questionIndex].text = text;
      }
    }

    FormManager.storeForm();
  }
};
