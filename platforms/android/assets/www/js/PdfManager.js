// Creation, opening and deletion of pdfs
var PdfManager = {
  
  pdfOutput         : null,
  doc               : null,
  verticalOffset    : 0,
  maxVerticalOffset : 11,
  initVerticalOffset: 0.5,
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
    // Check for signature
    if (!this.hasSigned) {
      Helper.showAlert('Por favor, firma antes de generar el formulario');
      return;
    }

    // Show loading
    Helper.showLoader('Generando archivo...');

    // Create document
    var self = this;
    setTimeout(function(){
      self._createPdfContent();
      self._storePdf();
    }, 100);
  },

  // Adds vertical offset to the document and extra pages if needed
  _addOffset: function(val)
  {
    if ( (this.verticalOffset + val) > this.maxVerticalOffset ) {
      this.doc.addPage();
      this.verticalOffset = this.initVerticalOffset;
    } else {
      this.verticalOffset += val;
    }
  },

  _createPdfContent: function()
  {
    Helper.includeScript('lib/jspdf/jspdf.min');

    console.log("generating pdf...");
    this.doc = new jsPDF('p','in');
    this._addOffset(this.initVerticalOffset);
    var margin = 0.4; // Left margin
    var sizeA = 12; // Font sizes
    var sizeB = 14;
    var sizeC = 16;
    var lines; // Lines for paragraphs
    this.doc.setFont("courier");
    this.doc.setFontType("normal");

    // Title
    this.doc.setFontSize(sizeC);
    var category = CategoryManager.getCategory(FormManager.formInProgress.checklistId);
    this.doc.text(margin, this.verticalOffset, category.name);
    this.doc.setFontSize(sizeA);
    this._addOffset(0.25);

    // Print the questions
    var answer;
    var questions = QuestionManager.getQuestions(FormManager.formInProgress.checklistId);
    for (var i = 0; i < questions.length; i++) {
      
      // Question title
      this._addOffset(0.1);
      this.doc.setFont("helvetica");
      this.doc.setFontType("bold");
      this.doc.setFontSize(sizeB);
      lines = this.doc.splitTextToSize(questions[i].question, 7.5);
      this.doc.text(margin, this.verticalOffset + sizeB / 72, lines);
      this._addOffset((lines.length + 1.2) * sizeB / 72);

      // Values
      this.doc.setFontSize(sizeA);
      this.doc.setFont("courier");
      this.doc.setFontType("normal");
      answer = QuestionManager.getQuestionStoredValue(questions[i].id);

      // Unanswered
      if (answer === null) {
        this.doc.text(margin, this.verticalOffset, '-');
        this._addOffset(0.2);
        continue;
      }

      // Boolean
      if (!Helper.isEmpty(answer.boolean)) {
        if (answer.boolean == 1) {
          this.doc.text(margin, this.verticalOffset, 'Sí.');
        } if (answer.boolean == 0) {
          this.doc.text(margin, this.verticalOffset, 'No.');
        }
        this._addOffset(0.2);
      }
      
      // Text
      if (!Helper.isEmpty(answer.text)) {
        lines = this.doc.splitTextToSize(answer.text, 7.5);
        this.doc.text(margin, this.verticalOffset, lines);
        this._addOffset((lines.length + 1) * sizeA / 72);
      }
      
      // Images
      if (!Helper.isEmpty(answer.images)) {
        var extraMargin = 0;
        for (var j = 0; j < answer.images.length; j++) {
          // 2nd image, right column
          if (j % 2 === 1) {
            extraMargin += 2.8;
          }
          // 3rd image, second row
          if (j % 3 === 2) {
            extraMargin = 0;
            this._addOffset(2.8);
          }
          this.doc.addImage(answer.imagesBase64[j], 'JPG', margin + extraMargin, this.verticalOffset);
        }
        this._addOffset(2.5);
      }

      // Select
      if (!Helper.isEmpty(answer.value)) {
        if (typeof questions[i].options[answer.value - 1] !== 'undefined') {
          this.doc.text(margin, this.verticalOffset, questions[i].options[answer.value - 1] + '.');
        } else {
          this.doc.text(margin, this.verticalOffset, '-');
        }
        this._addOffset(0.2);
      }

      this._addOffset(0.4);
    }

    // Signature
    this._addOffset(0.5);
    this.doc.text(margin, this.verticalOffset, 'Firmado');
    this._addOffset(0.1);
    this.doc.addImage(this._getSignature(), 'PNG', margin, this.verticalOffset);

    // Store pdf data
    this.pdfOutput = this.doc.output();
    // this.doc.save('Test.pdf');
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
    FormManager.markAsGenerated();
    PdfManager.loadPdfList();
    PdfManager._resetOffset();
    Helper.hideLoader();
    PdfManager.openPdf(app.testFile);
  },

  // Resets the offset
  _resetOffset: function()
  {
    this.verticalOffset = 0;
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

  init: function()
  {
    this.loadPdfList();
  }
};

PdfManager.init();
