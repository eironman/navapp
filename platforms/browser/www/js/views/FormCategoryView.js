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
          '<div id="imagenFirma">' +
            '<img id="img" src="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' width=\'559\' height=\'243\'><path stroke-linejoin=\'round\' stroke-linecap=\'round\' stroke-width=\'3\' stroke=\'rgb(0, 0, 0)\' fill=\'none\' d=\'M 26 159 c 0 -0.59 0.29 -22.85 0 -34 c -0.04 -1.67 -0.03 -4.73 -1 -5 c -3.23 -0.9 -13.12 -0.97 -17 0 c -1.33 0.33 -2.39 3.25 -3 5 c -1.64 4.67 -3.56 10.04 -4 15 c -0.85 9.59 -1.32 23.96 0 30 c 0.32 1.47 4.75 1.88 7 2 c 3.72 0.2 8.06 -0.18 12 -1 c 21.81 -4.53 42.53 -10.43 65 -15 c 19.83 -4.03 38.63 -7.92 58 -10 c 11.52 -1.24 23.27 0.79 35 0 c 13.17 -0.89 25.8 -4.57 39 -5 c 37.92 -1.25 74.26 0.54 113 0 c 10.65 -0.15 20.35 -1.77 31 -2 c 21.25 -0.46 40.77 0.7 62 0 c 20.59 -0.68 39.41 -3.37 60 -4 c 23.97 -0.74 49.73 0.81 70 0 l 5 -3\'/><path stroke-linejoin=\'round\' stroke-linecap=\'round\' stroke-width=\'3\' stroke=\'rgb(0, 0, 0)\' fill=\'none\' d=\'M 71 182 c 0.1 -0.1 4.65 -3.68 6 -6 c 8.84 -15.19 17.5 -32.29 26 -49 c 1.65 -3.25 2.43 -6.85 4 -10 c 1.05 -2.11 3.35 -4.05 4 -6 c 0.54 -1.62 -0.39 -4.18 0 -6 c 0.56 -2.59 2.32 -8.66 3 -8 c 3.76 3.63 19.79 25.43 28 38 c 2.04 3.12 3.03 9.89 4 11 c 0.35 0.4 2.55 -1.83 3 -3 c 2.85 -7.52 5.21 -19.5 8 -26 c 0.46 -1.07 3.22 -2.56 4 -2 c 5.03 3.62 14.25 14.69 21 20 c 1.7 1.33 4.84 1.1 7 2 c 1.73 0.72 4.5 3.67 5 3 c 1.34 -1.79 2.31 -10.07 4 -15 c 2.01 -5.83 4.36 -11.3 7 -17 c 3.86 -8.32 7.71 -16.18 12 -24 c 1.38 -2.51 3.2 -5.2 5 -7 c 0.94 -0.94 2.94 -2.12 4 -2 c 1.38 0.15 3.65 1.71 5 3 c 7.02 6.75 13.71 14.95 21 22 c 2.73 2.64 5.85 4.64 9 7 c 2.38 1.78 4.52 3.57 7 5 c 3.86 2.24 11.06 5.81 12 6 c 0.31 0.06 -1.26 -3.75 -2 -4 c -0.74 -0.25 -3.91 0.99 -4 2 c -0.86 10.16 -0.75 30.33 0 45 c 0.24 4.67 1.84 12.4 3 14 c 0.47 0.65 4.06 -1.7 5 -3 c 1.38 -1.9 2.28 -5.27 3 -8 c 0.94 -3.57 0.71 -7.68 2 -11 c 2.57 -6.64 6.26 -14.28 10 -20 c 1.54 -2.36 4.83 -3.83 7 -6 c 2.17 -2.17 3.73 -5.09 6 -7 c 3.89 -3.27 8.64 -6.48 13 -9 c 1.74 -1.01 4.03 -1.75 6 -2 c 3.12 -0.39 8.08 -1.61 10 0 c 6.42 5.38 16.62 21.62 21 26 c 0.47 0.47 2.64 -1.11 3 -2 c 1.32 -3.29 2.39 -8.71 3 -13 c 0.37 -2.57 0 -8.14 0 -8 c 0 1 -0.54 38.03 0 57 c 0.13 4.38 1.03 8.75 2 13 c 0.7 3.06 1.64 6.18 3 9 c 3.6 7.45 8.55 14.48 12 22 c 2.18 4.74 4.27 10.25 5 15 c 0.51 3.32 0.26 8.79 -1 11 c -0.87 1.52 -4.78 2.74 -7 3 c -2.93 0.34 -8.44 0.27 -10 -1 c -1.25 -1.02 -0.92 -5.29 -1 -8 c -0.25 -8.06 -0.41 -15.96 0 -24 c 0.26 -5.07 0.52 -10.32 2 -15 c 4.71 -14.88 10.39 -30.72 17 -45 c 3.58 -7.74 9.71 -14.25 14 -22 c 7.95 -14.35 19.09 -39.19 22 -43 c 0.59 -0.78 2.92 5.93 4 9 c 0.91 2.57 0.99 5.55 2 8 c 1.26 3.05 3.22 7.02 5 9 c 0.71 0.79 3.09 1.42 4 1 c 2.05 -0.93 5.1 -5.31 7 -6 c 0.92 -0.34 3.06 1.06 4 2 c 1.8 1.8 3.09 4.96 5 7 c 2.67 2.86 6.07 5.97 9 8 c 1 0.7 2.7 1 4 1 c 4.74 0 11.46 1.07 15 -1 c 6.83 -3.98 14.31 -12.84 21 -20 c 7.86 -8.41 15.7 -17.09 22 -26 c 3.06 -4.33 5.7 -10.18 7 -15 c 0.86 -3.2 -0.46 -7.42 0 -11 c 0.86 -6.64 3.42 -13.34 4 -20 c 0.74 -8.5 0.7 -19.21 0 -26 c -0.11 -1.11 -2.11 -3 -3 -3 c -1.41 0 -4.9 1.57 -6 3 c -1.77 2.3 -3.63 6.71 -4 10 c -0.88 7.95 -0.44 17.35 0 26 c 0.22 4.37 0.35 9.32 2 13 c 3.65 8.16 10.75 16.51 15 25 l 5 15\'/></svg>">' +
          '</div>' +
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
      i.id = "img";
      // i.src = imgData;
      i.src = "data:" + imgData[0] + "," + imgData[1];
      $("#imagenFirma").html(i);
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