// List, opening and deletion of pdfs
var PdfManager = {
  
  pdfOutput         : null,
  pdfName           : null,
  hasSigned         : false,
  documentsGenerated: [],

  /**
  * Deletes a pdf from the device
  **/
  deletePdf: function(file, callbackOk)
  {
    FileManager.deleteFile(app.storageDirectory + file, callbackOk);
  },

  /**
  * Generates pdf
  **/
  generatePdf: function()
  {
    // Check for signature
    if (!this.hasSigned) {
      Helper.showAlert('Por favor, firma antes de generar el formulario');
      return;
    }

    // Show loading
    Helper.showLoader('Generando archivo...');

    // Generate document name
    this.generatePdfName();

    // Create document
    var self = this;
    setTimeout(function(){
      self.pdfOutput =  PdfContentGenerator.createPdfContent();
      self.storePdf();
    }, 100);
  },

  /**
  * Generates the name for the document
  **/
  generatePdfName: function()
  {
    var date = new Date();
    var checklist = CategoryManager.getCategory(FormManager.formInProgress.checklistId);

    this.pdfName =
      '[' + Helper.pad(date.getDate(), 2) +           // Day
      '.' + Helper.pad(date.getMonth() + 1, 2) +      // Month
      '.' + date.getFullYear() + ']' +                // Year
      '[' + Helper.pad(date.getHours(), 2) +          // Hours
      '.' + Helper.pad(date.getMinutes(), 2) +        // Minutes
      '.' + Helper.pad(date.getSeconds(), 2) + ']' +  // Seconds
      '_' + checklist.name + '.pdf';                  // Checklist name
  },

  /**
  * Loads thelist of the pdf files in storage directory
  **/
  loadPdfList: function() {
    if (!Helper.isBrowser()) {
      FileManager.readDirectory(app.storageDirectory, this.onPdfListLoadSuccess);
    }
  },

  /**
  * Callback to write the pdf content when the pdf file is created in the device
  **/
  onPdfFileCreated: function(fileEntry)
  {
    console.log('filepath: ' + fileEntry.toURL());
    FileManager.writeFile(fileEntry, PdfManager.pdfOutput, false, PdfManager.onPdfWritten);
  },

  onPdfListLoadSuccess: function(entries) {
    PdfManager.documentsGenerated = entries;
    console.log("Documents: " + PdfManager.documentsGenerated.length);
  },

  /**
  * Callback when the pdf content has been written
  **/
  onPdfWritten: function(fileEntry)
  {
    FormManager.markAsGenerated();
    PdfManager.loadPdfList();
    Helper.hideLoader();
    RequestManager.sendPdfToServer();
    PdfManager.openPdf(PdfManager.pdfName);
  },

  /**
  * Opens a pdf
  **/
  openPdf: function(file)
  {
    var target = '_system';
    if (Helper.isIOs()) {
      target = '_blank';
    }

    window.open(app.storageDirectory + file, target, 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
  },

  /**
  * Creates the pdf in the device (pending writing the content in it)
  **/
  storePdf: function()
  {
    var self = this;
    window.resolveLocalFileSystemURL(
      app.storageDirectory,
      function onFsLoad(dirEntry) {
        FileManager.createFile(dirEntry, self.pdfName, self.onPdfFileCreated);
      },
      function onErrorLoadFs(e) {
        console.log('resolveLocalFileSystemURL error:', e);
      }
    );
  },

  init: function()
  {
    RequestManager.includeScript('PdfContentGenerator');
    this.loadPdfList();
  }
};

PdfManager.init();
