// Creation, opening and deletion of pdfs
var PdfManager = {
  
  pdfOutput         : null,
  hasSigned         : false,
  documentsGenerated: [],

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
  * Loads thelist of the pdf files in storage directory
  **/
  loadPdfList: function() {
    if (!Helper.isBrowser()) {
      FileManager.readDirectory(app.storageDirectory, this.onPdfListLoadSuccess);
    }
  },
  onPdfListLoadSuccess: function(entries) {
    PdfManager.documentsGenerated = entries;
    console.log("Documents: " + PdfManager.documentsGenerated.length);
  },

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
    /*if (!this.hasSigned) {
      Helper.showAlert('Por favor, firma antes de generar el formulario');
      return;
    }*/

    Helper.includeScript('lib/jspdf/jspdf.min');

    // Pdf content
    console.log("generating pdf...");
    var doc = new jsPDF('p','in');
    var margin = 0.4;
    var verticalOffset = 0.5;
    var sizeA = 12;
    var sizeB = 14;
    var sizeC = 16;
    var lines;
    doc.setFont("courier");
    doc.setFontType("normal");

    // Title
    doc.setFontSize(sizeC);
    doc.text(margin, verticalOffset, 'TÍTULO');
    doc.setFontSize(sizeA);
    verticalOffset += 0.25;

    // Print the questions
    var value;
    var questions = QuestionManager.getQuestions(FormManager.formInProgress.checklistId);
    for (var i = 0; i < questions.length; i++) {
      
      // Question title
      verticalOffset += 0.1;
      doc.setFont("helvetica");
      doc.setFontType("bold");
      doc.setFontSize(sizeB);
      lines = doc.splitTextToSize(questions[i].question, 7.5);
      doc.text(margin, verticalOffset + sizeB / 72, lines);
      verticalOffset += (lines.length + 1.2) * sizeB / 72;

      // Values
      doc.setFontSize(sizeA);
      doc.setFont("courier");
      doc.setFontType("normal");
      value = QuestionManager.getQuestionStoredValue(questions[i].id);

      // Unanswered
      if (value === null) {
        doc.text(margin, verticalOffset, '-');
        verticalOffset += 0.2;
        continue;
      }

      // Boolean
      if (!Helper.isEmpty(value.boolean)) {
        if (value.boolean == 1) {
          doc.text(margin, verticalOffset, 'Sí.');
        } if (value.boolean == 0) {
          doc.text(margin, verticalOffset, 'No.');
        }
        verticalOffset += 0.2;
      }
      
      // Text
      if (!Helper.isEmpty(value.text)) {
        lines = doc.splitTextToSize(value.text, 7.5);
        doc.text(margin, verticalOffset, lines);
        verticalOffset += (lines.length + 1) * sizeA / 72;
      }
      
      // Images
      if (!Helper.isEmpty(value.images)) {
        var extraMargin = 0;
        for (var j = 0; j < value.images.length; j++) {
          // 2nd image, right column
          if (j % 2 === 1) {
            extraMargin += 3;
          }
          // 3rd image, second row
          if (j % 3 === 2) {
            verticalOffset += 3;
          }
          doc.addImage(value.imagesBase64[j], 'JPG', margin + extraMargin, verticalOffset);
        }
        verticalOffset += 2.5;
      }

      // Select
      if (!Helper.isEmpty(value.value)) {
        doc.text(margin, verticalOffset, questions[i].options[value.value] + '.');
        verticalOffset += 0.2;
      }

      verticalOffset += 0.4;
    }

    // Signature
    /*verticalOffset += 0.5;
    doc.text(margin, verticalOffset, 'Firmado');
    verticalOffset += 0.1;
    doc.addImage(this._getSignature(), 'PNG', margin, verticalOffset);*/

    // Store pdf data
    this.pdfOutput = doc.output();
    this._storePdf();
    //doc.save('Test.pdf');
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
  * Creates the pdf in the device (pending writing the content in it)
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
    PdfManager.loadPdfList();
    PdfManager.openPdf(app.testFile);
  },

  init: function()
  {
    this.loadPdfList();
  }
};

PdfManager.init();
