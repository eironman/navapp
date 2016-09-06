// Shows sections of a form
var FormCategoryView = {
  _category: null,
  _template:
    '<div id="FormStructure">' +
      '{{menu}}' +
      '<h1 class="has_menu">' +
        '{{title}}' +
        '<span id="open_menu"></span>' +
      '</h1>' +
      '{{search}}' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="back_home" class="button button_back" href="#">--back--</a>' +
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
    $("#FormStructure .list_a a").on('click', function(e) {
      e.preventDefault();
    });

    // Go back button
    var self = this;
    $("#back_home").on('click', function(e) {
      if (self._category.parent === null) {
        RequestManager.loadView('Home');
      } else {
        RequestManager.loadView('FormCategory', self._category.parent);
      }
    });
    
    // Click on a parent category
    $(".parent").on('click', function(e) {
      RequestManager.loadView('FormCategory', $(this).data('id'));
    });

    // Click on a final category
    $(".final").on('click', function(e) {
      var categoryId = $(this).data('id');
      FormManager.shouldInitForm(categoryId, function(){
        RequestManager.loadView('FormChecklist', categoryId);
      });
    });
  },

  generateTemplate: function() {
    RequestManager.includeScript('views/partials/HiddenMenu');
    RequestManager.includeScript('views/partials/SearchChecklist');
    var template = this._template;

    // Side Menu
    template = template.replace('{{menu}}', HiddenMenu.render('open_menu'));

    // Title
    template = template.replace('{{title}}', this._category.name);

    // Search
    template = template.replace('{{search}}', SearchChecklist.render());

    // Categories menu
    var options = '';
    var categoriesIds = this._category.children;
    var menuOption;
    for (var i = 0; i < categoriesIds.length; i++) {
      category = CategoryManager.getCategory(categoriesIds[i]);
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
    app.loadHtmlContent(template);
    this.menuActions();
  }
};