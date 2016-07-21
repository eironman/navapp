// Creates and opens a pdf
var PdfManager = {
  
  pdfOutput: null,

  /**
  * Opens a pdf
  **/
  openPdf: function(file)
  {
    var target = '_system';
    if (Helper.isIOs()) {
      target = '_blank';
    }
    console.log('Open: ' + app.storageDirectory + file);
    window.open(app.storageDirectory + file, target, 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
  },

  /**
  * Generates pdf
  **/
  generatePdf: function()
  {
    Helper.includeScript('lib/jspdf/jspdf.min');

    // Pdf content
    console.log("generating pdf...");
    var doc = new jsPDF();
    doc.text(20, 20, 'TÍTULO');
    doc.setFont("courier");
    doc.setFontType("normal");
    doc.text(20, 30, 'Pdf de la aplicación naval.');
    doc.text(20, 50, 'Firma');

    // Signature
    doc.addImage(this._getSignature(), 'PNG', 20, 55);

    // Store pdf data
    this.pdfOutput = doc.output();
    this._storePdf();
  },

  /**
  * Returns the signature image data
  **/
  _getSignature: function()
  {
    // Libs
    Helper.includeScript('lib/canvg/rgbcolor');
    Helper.includeScript('lib/canvg/stackBlur');
    Helper.includeScript('lib/canvg/canvg.min');

    // Use canvas to covert svg to png
    var imgSrc = $("#signatureImage").attr('src').replace('data:image/svg+xml,', '');
    var svg = imgSrc.replace(/<\?xml.+<svg/, '<svg');
    canvg('canvas', svg);
    return canvas.toDataURL("image/png");
  },

  /**
  * Creates the pdf in the device
  **/
  _storePdf: function()
  {
    var self = this;
    window.resolveLocalFileSystemURL(
      app.storageDirectory,
      function onFsLoad(dirEntry) {
        FileManager.createFile(dirEntry, app.testFile, self._onPdfFileCreated);
      },
      function onErrorLoadFs(e) {
        console.log('resolveLocalFileSystemURL error:', e);
      }
    );
  },

  /**
  * Callback to write the pdf content when the pdf file is created in the device
  **/
  _onPdfFileCreated: function(fileEntry) {
    console.log('filepath: ' + fileEntry.toURL());
    FileManager.writeFile(fileEntry, PdfManager.pdfOutput, false, PdfManager._onPdfWritten);
  },

  /**
  * Callback when the pdf content has been written
  **/
  _onPdfWritten: function(fileEntry) {
    console.log("File written, prepare to open");
    PdfManager.openPdf(app.testFile);
  }
};
