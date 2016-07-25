var DocumentsView = {

  fileToDelete: null,

  _template:
    '<div id="DocumentsView">' +
      '<h1>Documentos Generados</h1>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="back" class="button button_back" href="#">Volver</a>' +
        '</li>' +
        /*'<li>' +
          '<div class="row">' +
            '<div class="col-11">' +
              '<a class="document button" href="#" data-name="nombreTotal.pdf">' +
                'Nombre' +
              '</a>' +
            '</div>' +
            '<div class="col-1 icon_delete"></div>' +
          '</div>' +
        '</li>'+*/
      '</ul>' +
    '</div>',

  _documentItem:
    '<li>' +
      '<div class="row">' +
        '<div class="col-11">' +
          '<a class="document button" href="#" data-name="{{fullName}}">' +
            '{{name}}' +
          '</a>' +
        '</div>' +
        '<div class="col-1 icon_delete"></div>' +
      '</div>' +
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

    // Open document
    $('.document').on('click', function() {
      PdfManager.openPdf($(this).data('name'));
    });

    // Delete document
    $('.icon_delete').on('click', function() {
      DocumentsView.fileToDelete = $(this).closest('li').find('.document').data('name');
      Helper.showConfirm(
        '¿Seguro que desea eliminar este elemento?',
        DocumentsView.onConfirmDialogClosed
      )
    });
  },

  /**
  * Callback when user makes an action with the delete dialog
  **/
  onConfirmDialogClosed: function(buttonPressed)
  {
    // buttonPressed is a param used only for mobile devices, 1 means Ok
    // For browsers, no param is passed, so this function is called only for Ok
    if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
      FileManager.deleteFile(app.storageDirectory, DocumentsView.fileToDelete);
    }
  },

  render: function() {
    $(".app").html(this._template);
    this.menuActions();
    
    // TODO: Remove timeout
    var self = this;
    window.setTimeout(function(){
      self.loadDocuments();
    }, 300);
  }
};