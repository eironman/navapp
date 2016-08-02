var DocumentsView = {

  fileNameToDelete: null,
  fileItemToRemove: null,
  _template       :
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
    var documents = this.orderDocuments(PdfManager.documentsGenerated);
    for (var i = 0; i < documents.length; i++) {
      fullName = documents[i].name;
      item = this._documentItem.replace('{{fullName}}', fullName);
      item = item.replace('{{name}}', fullName.replace('.pdf', ''));
      $('.list_a').append(item);
    }

    // Open document
    $('.document').on('click', function() {
      PdfManager.openPdf($(this).data('name'));
    });

    // Delete document
    $('.icon_delete').on('click', function() {
      DocumentsView.fileNameToDelete = $(this).closest('li').find('.document').data('name');
      DocumentsView.fileItemToRemove = $(this).closest('li');
      Helper.showConfirm(
        '¿Seguro que desea eliminar el documento?',
        DocumentsView.onConfirmDialogClosed
      )
    });
  },

  /**
  * Callback when user makes an action with the delete dialog
  **/
  onConfirmDialogClosed: function(buttonPressed)
  {
    if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
      PdfManager.deletePdf(DocumentsView.fileNameToDelete, DocumentsView.onFileDeleted);
    }
  },

  /**
  * Callback when pdf is deleted
  **/
  onFileDeleted: function()
  {
    Helper.showAlert('Archivo eliminado satisfactoriamente', 'Aviso');
    $(DocumentsView.fileItemToRemove).remove();
    PdfManager.loadPdfList();
  },

  // Orders documents by date
  orderDocuments: function(documents)
  {
    var dateA;
    var dateB;
    documents.sort(function(a,b) { 

      dateA = new Date(
        a.name.substring(7, 11),                  // Year
        parseInt(a.name.substring(4, 6), 10) + 1, // Month
        parseInt(a.name.substring(1, 3), 10),     // Day
        parseInt(a.name.substring(13, 15), 10),   // Hour
        parseInt(a.name.substring(16, 18), 10),   // Mins
        parseInt(a.name.substring(19, 21), 10)    // Secs
      );

      dateB = new Date(
        b.name.substring(7, 11),                  // Year
        parseInt(b.name.substring(4, 6), 10) + 1, // Month
        parseInt(b.name.substring(1, 3), 10),     // Day
        parseInt(b.name.substring(13, 15), 10),   // Hour
        parseInt(b.name.substring(16, 18), 10),   // Mins
        parseInt(b.name.substring(19, 21), 10)    // Secs
      );

      return dateB.getTime() - dateA.getTime() 
    });

    return documents;
  },

  render: function() {
    app.loadHtmlContent(this._template);
    this.menuActions();
    this.loadDocuments();
    
    // TODO: Remove timeout
    /* var self = this;
    window.setTimeout(function(){
      self.loadDocuments();
    }, 300); */
  }
};