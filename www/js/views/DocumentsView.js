var DocumentsView = {

  _template:
    '<div id="DocumentsView">' +
      '<h1>Documentos Generados</h1>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="back" class="button button_back" href="#">Volver</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  _documentItem:
    '<li>' +
      '<a class="document button" href="#" data-name="{{fullName}}">{{name}}</a>' +
    '</li>',

  menuActions: function() {
    var self = this;
    $("#back").on('click', function(e) {
      e.preventDefault();
      Helper.loadView('Home');
    });
  },

  /**
  * Shows the documents list
  **/
  loadDocuments: function() {
    var item;
    var fullName;
    
    // List
    for (var i = 0; i < PdfManager.documentsGenerated.length; i++) {
      fullName = PdfManager.documentsGenerated[i].name;
      item = this._documentItem.replace('{{fullName}}', fullName);
      item = item.replace('{{name}}', fullName.split('.')[0]);
      $('.list_a').append(item);
    }

    // Open documents
    $('.document').on('click', function() {
      PdfManager.openPdf($(this).data('name'));
    });
  },

  render: function() {
    $(".app").html(this._template);
    this.menuActions();
    this.loadDocuments();
  }
};