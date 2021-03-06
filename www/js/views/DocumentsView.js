var DocumentsView = {

  fileNameToSend  : null,
  fileNameToDelete: null,
  fileItemToRemove: null,
  _template       :
    '<div id="contenedor">' +
      '<div id="top">' +
        '<div class="back">' +
          '<a id="back_button" href="#"><i class="flaticon-previous"></i></a>' +
        '</div>' +
        '<div class="titulo">' +
          '--docsGenerated--' +
          '{{boat}}' +
        '</div>' +
      '</div>' +
      '<div id="contenido">' +
        '<ul id="document_list" class="list_a"></ul>' +
        '<div id="push"></div>' +
      '</div>' +
    '</div>',

  _documentItem:
    '<li>' +
      '<div class="row">' +
        '<div class="col-1 icon_send"><i class="flaticon-note"></i></div>' +
        '<div class="col-9 pl10">' +
          '<a class="list_item" href="#" data-name="{{fullName}}">' +
            '{{name}}' +
          '</a>' +
        '</div>' +
        '<div class="col-1 icon_delete"><i class="flaticon-rubbish-bin"></i></div>' +
      '</div>' +
    '</li>',

  /**
  * Shows the documents list
  **/
  loadDocuments: function()
  {
    // List
    var item;
    var fullName;
    var documents = this.orderDocuments(PdfManager.documentsGenerated);
    for (var i = 0; i < documents.length; i++) {
      fullName = documents[i].name;
      item = this._documentItem.replace('{{fullName}}', fullName);
      item = item.replace('{{name}}', fullName.replace('.pdf', ''));
      $('#document_list').append(item);
    }

    // Open document
    $('.list_item').on('click', function() {
      PdfManager.openPdf($(this).data('name'));
    });

    // Send document
    $('.icon_send').on('click', function() {

      var fileNameToSend = $(this).closest('li').find('.list_item').data('name');

      // Dialog to send a PDF
      RequestManager.includeScript('views/partials/SendPdfDialog');
      SendPdfDialog.render(fileNameToSend);
    });

    // Delete document
    $('.icon_delete').on('click', function() {
      DocumentsView.fileNameToDelete = $(this).closest('li').find('.list_item').data('name');
      DocumentsView.fileItemToRemove = $(this).closest('li');
      Helper.showConfirm(
        LocaleManager.get('confirmDeleteDocument'),
        DocumentsView.onDeleteConfirm
      )
    });
  },

  menuActions: function()
  {
    $(".back").on('click', function(e) {
      e.preventDefault();
      RequestManager.loadView('Home');
    });
  },

  /**
  * Callback when user makes an action with the delete dialog
  **/
  onDeleteConfirm: function(buttonPressed)
  {
    if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
      PdfManager.deletePdf(
        DocumentsView.fileNameToDelete,
        DocumentsView.onFileDeleted
      );
    }
  },

  /**
  * Callback when pdf is deleted
  **/
  onFileDeleted: function()
  {
    Helper.showAlert(LocaleManager.get('docDeleted'), LocaleManager.get('notice'));
    $(DocumentsView.fileItemToRemove).remove();
    PdfManager.loadPdfList();
  },

  // Orders documents by date.
  // Gets the substring of the document name that has its date.
  orderDocuments: function(documents)
  {
    var dateA;
    var dateB;
    documents.sort(function(a,b) { 
      
      dateA = new Date(
        a.name.substring(6, 10),                  // Year
        parseInt(a.name.substring(3, 5), 10) + 1, // Month
        parseInt(a.name.substring(0, 2), 10),     // Day
        parseInt(a.name.substring(11, 12), 10),   // Hour
        parseInt(a.name.substring(14, 16), 10),   // Mins
        parseInt(a.name.substring(17, 19), 10)    // Secs
      );

      dateB = new Date(
        b.name.substring(6, 10),                  // Year
        parseInt(b.name.substring(3, 5), 10) + 1, // Month
        parseInt(b.name.substring(0, 2), 10),     // Day
        parseInt(b.name.substring(11, 12), 10),   // Hour
        parseInt(b.name.substring(14, 16), 10),   // Mins
        parseInt(b.name.substring(17, 19), 10)    // Secs
      );

      return dateB.getTime() - dateA.getTime() 
    });

    return documents;
  },

  render: function(data)
  {
    // Boat name for title
    var template = this._template.replace('{{boat}}', data.boat);

    app.loadHtmlContent(template);
    this.menuActions();
    this.loadDocuments();
  }
};