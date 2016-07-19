// Shows sections of a form
var FormCategoryView = {
  _category: null,
  _template:
    '<div id="FormStructure">' +
      '<h1>{{title}}</h1>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="back_home" class="button button_back" href="#">Volver</a>' +
        '</li>' +
        '<li>' +
          '<a class="button parent" href="#">PDF</a>' +
        '</li>' +
        '<li>' +
          '<div id="firma"></div>' +
        '</li>' +
        '<li>' +
          '<a id="crearFirma" class="button" href="#">Generar firma</a>' +
          '<div id="imagenFirmaContenedor"></div>' +
          '<canvas class="hidden" id="canvas"></canvas>' +
        '</li>' +
        '{{menuCategories}}' +
      '</ul>' +
    '</div>',

  _parentCategory:
    '<li>' +
      '<a class="button parent" data-id="{{id}}" data-children="{{children}}" href="#">' +
        '{{name}}' +
      '</a>' +
    '</li>',

  _finalCategory:
    '<li>' +
      '<a class="button final" data-id="{{id}}" href="#">' +
        '{{name}}' +
      '</a>' +
    '</li>',

  menuActions: function() {
    $("#FormStructure .menu a").on('click', function(e) {
      e.preventDefault();
    });

    // Go back button
    var self = this;
    $("#back_home").on('click', function(e) {
      if (self._category.parent === null) {
        Helper.loadView('Home');
      } else {
        Helper.loadView('FormCategory', self._category.parent);
      }
    });
    
    // Click on a parent category
    $(".parent").on('click', function(e) {
      // Helper.loadView('FormCategory', $(this).data('id'));
      FormManager.generatePdf();
    });

    // Click on a final category
    $(".final").on('click', function(e) {
      Helper.loadView('FormQuestions', $(this).data('id'));
    });

    // FIRMA
    Helper.includeScript('lib/jSignature.min');
    $("#firma").jSignature();
    $("#crearFirma").on('click', function(e) {
      var imgData = $("#firma").jSignature("getData", "svg");
      console.log(imgData);
      var i = new Image();
      i.id = "imagenFirma";
      // i.src = imgData;
      i.src = "data:" + imgData[0] + "," + imgData[1];
      $("#imagenFirmaContenedor").html(i);
    });
  },

  generateTemplate: function() {
    var template = this._template;

    // Title
    template = template.replace('{{title}}', this._category.name);

    // Categories menu
    var options = '';
    var categoriesIds = this._category.children;
    var menuOption;
    for (var i = 0; i < categoriesIds.length; i++) {
      category = CategoryManager.categories[categoriesIds[i]];
      if (category.children.length > 0) {
        // Parent category
        menuOption = this._parentCategory.replace('{{name}}', category.name);
        menuOption = menuOption.replace('{{children}}', category.children);
      } else {
        // Final category
        menuOption = this._finalCategory.replace('{{name}}', category.name);
      }
      menuOption = menuOption.replace('{{id}}', category.id);
      options += menuOption;
    }
    return template.replace('{{menuCategories}}', options);
  },

  render: function(categoryId) {
    categoryId = categoryId || 0;
    this._category = CategoryManager.getCategory(categoryId);
    var template = this.generateTemplate();
    $(".app").html(template);
    this.menuActions();
  }
};