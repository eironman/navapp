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
    FileManager.deleteFile(app.userStorageDirectory + file, callbackOk);
  },

  /**
  * Generates pdf
  **/
  generatePdf: function()
  {
    // Check for signature
    if (!this.hasSigned) {
      Helper.showAlert(LocaleManager.get('pleaseSign'));
      return;
    }

    // Show loading
    Helper.showLoader(LocaleManager.get('generatingFile'));

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
      Helper.pad(date.getDate(), 2) + '.' +          // Day
      Helper.pad(date.getMonth() + 1, 2) + '.' +     // Month
      date.getFullYear() + '_' +                     // Year
      Helper.pad(date.getHours(), 2) + '-' +         // Hours
      Helper.pad(date.getMinutes(), 2) + '-' +       // Minutes
      Helper.pad(date.getSeconds(), 2) + '_' +       // Seconds
      Helper.cleanFileName(checklist.name) + '.pdf'; // Checklist name
  },

  /**
  * Loads the list of the pdf files in storage directory
  **/
  loadPdfList: function() {
    if (!Helper.isBrowser() && app.userStorageDirectory !== null) {
      FileManager.readDirectory(app.userStorageDirectory, this.onPdfListLoadSuccess);
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

  /**
  * Callback when the pdf creation has an error
  **/
  onPdfFileCreatedError: function(error)
  {
    console.log('[ERROR] Creating pdf:');
    console.log(error);
    Helper.hideLoader();
    Helper.showAlert(LocaleManager.get('generatingFileError'), LocaleManager.get('notice'));
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
    RequestManager.preparePdfDataAndSendIt(PdfManager.pdfName);
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

    window.open(app.userStorageDirectory + file, target, 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
  },

  /**
  * Creates the pdf in the device (pending writing the content in it)
  **/
  storePdf: function()
  {
    var self = this;
    window.resolveLocalFileSystemURL(
      app.userStorageDirectory,
      function onFsLoad(dirEntry) {
        FileManager.createFile(dirEntry, self.pdfName, self.onPdfFileCreated, self.onPdfFileCreatedError);
      },
      function onErrorLoadFs(e) {
        console.log('[CREATE FILE] resolveLocalFileSystemURL error:', e);
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
