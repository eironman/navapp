var DocumentsView = {

  fileNameToSend  : null,
  fileNameToDelete: null,
  fileItemToRemove: null,
  _template       :
    '<div id="DocumentsView">' +
      '{{menu}}' +
      '<h1 class="has_menu">' +
        '--docsGenerated--' +
        '<span id="open_menu"></span>' +
      '</h1>' +
      '<ul id="document_list" class="list_a">' +
        '<li>' +
          '<a id="back" class="button button_back" href="#">--back--</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  _documentItem:
    '<li>' +
      '<div class="row">' +
        '<div class="col-1 icon_send"></div>' +
        '<div class="col-10">' +
          '<a class="document button" href="#" data-name="{{fullName}}">' +
            '{{name}}' +
          '</a>' +
        '</div>' +
        '<div class="col-1 icon_delete"></div>' +
      '</div>' +
    '</li>',

  menuActions: function()
  {
    $("#back").on('click', function(e) {
      e.preventDefault();
      RequestManager.loadView('Home');
    });
  },

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
    $('.document').on('click', function() {
      PdfManager.openPdf($(this).data('name'));
    });

    // Send document
    $('.icon_send').on('click', function() {

      var fileNameToSend = $(this).closest('li').find('.document').data('name');

      // Dialog to send a PDF
      RequestManager.includeScript('views/partials/SendPdfDialog');
      SendPdfDialog.render(fileNameToSend);
    });

    // Delete document
    $('.icon_delete').on('click', function() {
      DocumentsView.fileNameToDelete = $(this).closest('li').find('.document').data('name');
      DocumentsView.fileItemToRemove = $(this).closest('li');
      Helper.showConfirm(
        LocaleManager.get('confirmDeleteDocument'),
        DocumentsView.onDeleteConfirm
      )
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

    var template = this._template;

    // Side Menu
    RequestManager.includeScript('views/partials/HiddenMenu');
    template = template.replace('{{menu}}', HiddenMenu.render('open_menu'));

    app.loadHtmlContent(template);
    this.menuActions();
    this.loadDocuments();
  }
};