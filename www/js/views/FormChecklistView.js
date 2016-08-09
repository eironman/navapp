// Shows questions of a section
var FormChecklistView = {
  _category: null,
  _template:
    '<div id="FormSectionView">' +
      '<h1>{{sectionName}}</h1>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="back_form" class="button button_back" href="#">Volver</a>' +
        '</li>' +
      '</ul>' +
      '<div class="section_content">' +
        '{{questions}}' +
      '</div>' +
      '<ul class="list_a">' +
        '<li class="signatureField">' +
        '</li>' +
        '<li>' +
          '<a id="reset_signature" class="button button_inactive" href="#">Borrar firma</a>' +
        '</li>' +
        '<li>' +
          '<a id="generate_pdf" class="button" href="#">Generar PDF</a>' +
        '</li>' +
      '</ul>' +
      // div to store the svg signature
      '<div class="hidden" id="signature_svg_container"></div>' +
      // canvas needed to convert the svg to png
      '<canvas class="hidden" id="canvas"></canvas>' +
    '</div>',

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

  menuActions: function()
  {
    var self = this;
    $("#back_form").on('click', function(e) {
      e.preventDefault();
      RequestManager.loadView('FormCategory', self._category.parent);
    });

    // Generate PDF
    $("#generate_pdf").on('click', function(e) {
      e.preventDefault();
      self.convertSignature();
      RequestManager.includeScript('PdfManager');
      PdfManager.generatePdf();
      $('#reset_signature').trigger('click');
    });

    // Reset signature inactive
    this.deactivateResetSignatureButton();
  },

  render: function(checklistId)
  {
    this._category = CategoryManager.getCategory(checklistId);
    var template = this._template.replace('{{sectionName}}', this._category.name);
    template = this.addFormFields(checklistId, template);
    app.loadHtmlContent(template);
    this.menuActions();
    this.initSignature();
  }
};