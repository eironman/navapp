// Shows questions of a section
var FormQuestionsView = {
  _category: null,
  _template:
    '<div id="FormSectionView">' +
      '<h1>{{sectionName}}</h1>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="back_form" class="button button_back" href="#">Volver</a>' +
        '</li>' +
        '<li class="signatureField">' +
          '<p>Firma</p>' +
          '<div id="signature"></div>' +
        '</li>' +
        '<li>' +
          '<a id="generate_pdf" class="button" href="#">Generar PDF</a>' +
        '</li>' +
      '</ul>' +
      '<div class="section_content">' +
        '{{sectionContent}}' +
      '</div>' +
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

    // Signature
    Helper.includeScript('lib/jSignature.min');
    $("#signature").jSignature();

    // Pdf
    $("#generate_pdf").on('click', function(e) {
      e.preventDefault();
      self.processSignature();
      PdfManager.generatePdf();
    });

    // Email
    $("#send_email").on('click', function(e) {
      cordova.plugins.email.isAvailable(
        function (isAvailable) {
          console.log('isAvailable: ' + isAvailable);
        }
      );
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
    $(".app").html(template);
    this.menuActions();
  }
};