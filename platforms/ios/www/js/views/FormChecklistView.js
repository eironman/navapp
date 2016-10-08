// Shows questions of a section
var FormChecklistView = {
  _category: null,
  _template:
    '<div id="contenedor">' +
      '<div id="top">' +
        '<div class="back">' +
          '<a id="back_button" href="#"><i class="flaticon-previous"></i></a>' +
        '</div>' +
        '<div class="titulo">' +
          '{{sectionName}}' +
        '</div>' +
      '</div>' +
      '<div id="contenido">' +
        '<div class="section_content">' +
          '{{questions}}' +
        '</div>' +
        '<ul class="list_a">' +
          '<li class="signatureField">' +
          '</li>' +
          '<li>' +
            '<a id="reset_signature" class="list_item button_inactive" href="#">--delSignature--</a>' +
          '</li>' +
          '<li>' +
            '<a class="list_item" id="generate_pdf" href="#">--genPDF--</a>' +
          '</li>' +
        '</ul>' +
        // div to store the svg signature
        '<div class="hidden" id="signature_svg_container"></div>' +
        // canvas needed to convert the svg to png
        '<canvas class="hidden" id="canvas"></canvas>' +
      '</div>' + // contenido
      '<div id="push"></div>' +
    '</div>', // contenedor

  _signature:
    '<p>Firma</p>' +
    '<div id="signature"></div>',

  activateResetSignatureButton: function()
  {
    var self = this;
    $('#reset_signature')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      $("#signature").jSignature("reset");
      self.deactivateResetSignatureButton();
      PdfManager.hasSigned = false;
    });
  },

  // Adds the questions to the form
  addFormFields: function(checklistId, template)
  {
    RequestManager.includeScript('views/partials/BooleanField');
    RequestManager.includeScript('views/partials/DescriptionField');
    RequestManager.includeScript('views/partials/SelectField');

    // Add different types of form fields
    var fields = '';
    var storedValue;
    var questions = QuestionManager.getQuestions(checklistId);
    for (var i = 0; i < questions.length; i++) {
      storedValue = QuestionManager.getQuestionStoredValue(questions[i].id);
      if (questions[i].type === QuestionManager.TYPE_BOOLEAN) {
        fields += BooleanField.render(questions[i], storedValue);
      } else if (questions[i].type === QuestionManager.TYPE_TEXT) {
        fields += DescriptionField.render(questions[i], storedValue);
      } else if (questions[i].type === QuestionManager.TYPE_SELECT) {
        fields += SelectField.render(questions[i], storedValue);
      }
    }

    return template.replace('{{questions}}', fields);
  },
  
  // Converts the signature to svg
  convertSignature: function()
  {
    var imgData = $("#signature").jSignature("getData", "svg");
    var i = new Image();
    i.id = "signatureImage";
    i.src = "data:" + imgData[0] + "," + imgData[1];
    $("#signature_svg_container").html(i);
  },

  deactivateResetSignatureButton: function()
  {
    $('#reset_signature')
    .addClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
    });
  },

  // Initiates signature field
  initSignature: function()
  {
    RequestManager.includeScript('lib/jSignature.min');

    PdfManager.hasSigned = false;
    
    // Include signature markup
    $(".signatureField").html(this._signature);
    $("#signature").off('change');
    
    // Init jSignature
    var self = this;
    $("#signature").jSignature({ width: '100%', height: 250 });
    $("#signature").on('change', function() {
      self.activateResetSignatureButton();
      PdfManager.hasSigned = true;
    });
  },

  // Check if all questions are answered
  isFormComplete: function()
  {
    var isComplete = true;
    var answered = false;

    // Check boolean field
    $(".form_field_boolean").each(function() {

      $(this).find('input[type="radio"]').each(function() {
        if ($(this).prop('checked') === true) {
          answered = true;
        }
      });
      
      if (!answered) {
        isComplete = false;
        $(this).find('p').css('color', 'red');
      } else {
        $(this).find('p').css('color', 'black');
      }

      answered = false;
    });

    // Check select field
    $(".form_field_select").each(function() {
      if ($(this).find('select').val() === '0') {
        isComplete = false;
        $(this).find('p').css('color', 'red');
      } else {
        $(this).find('p').css('color', 'black');
      }
    });

    // Check text field
    $(".form_field_text").each(function() {
      if ($(this).find('textarea').val() === '') {
        isComplete = false;
        $(this).find('p').css('color', 'red');
      } else {
        $(this).find('p').css('color', 'black');
      }
    });

    return isComplete;
  },

  menuActions: function()
  {
    var self = this;
    $("#back_button").on('click', function(e) {
      e.preventDefault();
      RequestManager.loadView('FormCategory', self._category.parent);
    });

    // Generate PDF
    $("#generate_pdf").on('click', function(e) {
      e.preventDefault();
      // Check if all fields have been completed
      if (self.isFormComplete()) {
        self.convertSignature();
        PdfManager.generatePdf();
        $('#reset_signature').trigger('click');
      } else {
        Helper.showAlert(LocaleManager.get('completeAllFields'), LocaleManager.get('notice'));
      }
    });

    // Reset signature inactive
    this.deactivateResetSignatureButton();
  },

  render: function(checklistId)
  {
    this._category = CategoryManager.getCategory(checklistId);
    
    // Title
    var template = this._template.replace('{{sectionName}}', this._category.name);
    console.log(1);

    // Form
    template = this.addFormFields(checklistId, template);

    app.loadHtmlContent(template);
    this.menuActions();
    this.initSignature();
  }
};