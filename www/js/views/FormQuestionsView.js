// Shows questions of a section
var FormQuestionsView = {
  _category : null,
  _template :
    '<div id="FormSectionView">' +
      '<h1>{{sectionName}}</h1>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="back_form" class="button button_back" href="#">Volver</a>' +
        '</li>' +
      '</ul>' +
      '<div class="section_content">' +
        '{{sectionContent}}' +
      '</div>' +
      '<ul class="list_a">' +
        '<li class="signatureField">' +
          '<p>Firma</p>' +
          '<div id="signature"></div>' +
        '</li>' +
        '<li id="reset_signature_container" class="hidden">' +
          '<a id="reset_signature" class="button" href="#">Borrar firma</a>' +
        '</li>' +
        '<li>' +
          '<a id="generate_pdf" class="button" href="#">Generar PDF</a>' +
        '</li>' +
      '</ul>' +
      // div to store the svg signature
      '<div class="hidden" id="signatureContainer"></div>' +
      // canvas needed to convert the svg to png
      '<canvas class="hidden" id="canvas"></canvas>' +
    '</div>',

  menuActions: function() {
    var self = this;
    $("#back_form").on('click', function(e) {
      e.preventDefault();
      Helper.loadView('FormCategory', self._category.parent);
    });

    // Pdf
    $("#generate_pdf").on('click', function(e) {
      e.preventDefault();
      self.processSignature();
      PdfManager.generatePdf();
    });

    // Reset signature
    $("#reset_signature").on('click', function(e) {
      e.preventDefault();
      $("#signature").jSignature("reset");
      $("#reset_signature_container").addClass("hidden");
      PdfManager.hasSigned = false;
    });
  },

  // Initiates signature field
  initSignature: function() {
    var self = this;
    Helper.includeScript('lib/jSignature.min');
    $("#signature").jSignature();
    $("#signature").on('change', function() {
      $("#reset_signature_container").removeClass("hidden");
      PdfManager.hasSigned = true;
    });
  },

  // Converts the signature to svg
  processSignature: function() {
    var imgData = $("#signature").jSignature("getData", "svg");
    var i = new Image();
    i.id = "signatureImage";
    i.src = "data:" + imgData[0] + "," + imgData[1];
    $("#signatureContainer").html(i);
  },

  addFormFields: function(template) {
    var fields = '';
    Helper.includeScript('views/partials/BooleanField');

    var data = {
      id      : 1,
      question: '¿Ha suministrado la mercancía solicitada?'
    }
    fields += BooleanField.render(data);

    data = {
      id      : 2,
      question: '¿La mercancía que porta es de la calidad pactada con la empresa?'
    }
    fields += BooleanField.render(data);

    data = {
      id      : 3,
      question: '¿Son los artículos de las marcas autorizadas?'
    }
    fields += BooleanField.render(data);

    return template.replace('{{sectionContent}}', fields);
  },

  render: function(categoryId) {
    this._category = CategoryManager.getCategory(categoryId);
    var template = this._template.replace('{{sectionName}}', this._category.name);
    template = this.addFormFields(template);
    app.loadHtmlContent(template);
    this.menuActions();
    this.initSignature();
  }
};