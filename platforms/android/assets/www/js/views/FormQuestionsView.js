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
      '</ul>' +
      '<div class="section_content">' +
        '{{sectionContent}}' +
      '</div>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="generate_pdf" class="button" href="#">Generar pdf</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  menuActions: function() {
    var self = this;
    $("#back_form").on('click', function(e) {
      e.preventDefault();
      Helper.loadView('FormCategory', self._category.parent);
    });
    $("#generate_pdf").on('click', function(e) {
      e.preventDefault();
      FormManager.generatePdf();
    });
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