// Generates the pdf content
var PdfContentGenerator = {
  
  doc               : null,
  sizeA             : 9, // Font sizes
  sizeB             : 10,
  sizeC             : 12,
  textMargin        : 0.6,
  initVerticalOffset: 0.8,
  verticalOffset    : 0.8,
  maxVerticalOffset : 11,
  imgVerticalOffset : 2.5,
  lineMargin        : 0.4,
  lineVerticalOffset: 0.3,
  lineMaxOffset     : 11.3,
  marginTopA        : 0.1,
  marginTopB        : 0.2,
  paragraphWithA    : 7,
  paragraphWithB    : 6,

  // Attaches an image to the document
  addImage: function(imgUri, marginLeft, marginTop)
  {
    if ( (this.verticalOffset + this.imgVerticalOffset) > this.maxVerticalOffset ) {
      this.addPage();
    }
    marginTop = marginTop || this.verticalOffset;
    
    this.doc.addImage(imgUri, 'JPG', marginLeft, marginTop);
  },

  // Adds vertical offset to the document and extra pages if needed
  addOffset: function(val)
  {
    if ( (this.verticalOffset + val) > this.maxVerticalOffset ) {
      this.addPage();
    } else {
      this.verticalOffset += val;
    }
  },

  // Adds a new page to the document
  addPage: function()
  {
    this.doc.addPage();
    this.verticalOffset = this.initVerticalOffset;
    this.createStructure();
  },

  addParagraph: function(text)
  {
    var lines = this.doc.splitTextToSize(text, this.paragraphWithA);
    var textOffset = (lines.length + this.marginTopA) * this.sizeA / 72;
    if ((this.verticalOffset + textOffset) > this.maxVerticalOffset) {
      this.addPage();
    }
    this.doc.text(this.textMargin, this.verticalOffset, lines);
    this.addOffset(textOffset);
  },

  addQuestionTitle: function(lines)
  {
    var textOffset = (lines.length + 1.5) * this.sizeB / 72;
    if ((this.verticalOffset + textOffset) > this.maxVerticalOffset) {
      this.addPage();
    } 
    this.doc.text(this.textMargin, this.verticalOffset + this.sizeB / 72, lines);
    this.addOffset(textOffset);
  },

  /**
  * Checklist name, client info and trip info (only in the first page)
  **/
  addPageHeader: function()
  {
    this.doc.setFont("courier");
    var clientInfo = StorageManager.get('navalClient', true);
    var lines, textOffset;
    
    // Checklist name
    this.doc.setFontSize(this.sizeC);
    var category = CategoryManager.getCategory(FormManager.formInProgress.checklistId);
    lines = this.doc.splitTextToSize(category.name, this.paragraphWithA);
    textOffset = (lines.length + 1) * this.sizeC / 72;
    this.doc.text(this.textMargin, this.verticalOffset, lines);
    this.addOffset(textOffset);

    // Logo
    if (!Helper.isEmpty(clientInfo.field_logotipo_empresa_64)) {
      var logo = 'data:image/jpg;base64,' + clientInfo.field_logotipo_empresa_64;
      this.addImage(logo, this.textMargin + 6.1, this.verticalOffset - 0.4);
    }

    // Client name
    this.doc.setFontSize(this.sizeA);
    this.doc.text(this.textMargin, this.verticalOffset, clientInfo.razon_social);
    this.addOffset(this.marginTopB);

    // Legal info
    lines = this.doc.splitTextToSize(clientInfo.textos_legales, this.paragraphWithB);
    textOffset = (lines.length + 1) * this.sizeA / 72;
    this.doc.text(this.textMargin, this.verticalOffset, lines);
    this.addOffset(textOffset);

    // Trip info
    var tripInfo = StorageManager.get('navalTripInfo', true);
    this.doc.text(this.textMargin, this.verticalOffset,
      tripInfo.navigationNumber + ' - ' +
      Helper.formatDate('b') + ' - ' +
      tripInfo.captain + ' - ' +
      tripInfo.boat
    );
    this.addOffset(this.marginTopB);

    // Separation line
    this.doc.setLineWidth(1/72)
    .line(this.textMargin, this.verticalOffset, 8.3 - this.textMargin, this.verticalOffset);
    this.doc.setFont("verdana");
  },

  // Draws the lines for the pdf structure
  createStructure: function()
  {
    this.doc.setLineWidth(1/72)
    // Top line
    .line(this.lineMargin, this.lineVerticalOffset, 8.3 - this.lineMargin, this.lineVerticalOffset)
    // Left line
    .line(this.lineMargin, this.lineVerticalOffset, this.lineMargin, this.lineMaxOffset)
    // Right line
    .line(8.3 - this.lineMargin, this.lineVerticalOffset, 8.3 - this.lineMargin, this.lineMaxOffset)
    // Bottom line
    .line(this.lineMargin, this.lineMaxOffset, 8.3 - this.lineMargin, this.lineMaxOffset);
  },

  // Pdf content
  createPdfContent: function()
  {
    RequestManager.includeScript('lib/jspdf/jspdf.min');

    console.log("generating pdf content...");
    var lines; // Lines for paragraphs

    // Init doc
    this.doc = new jsPDF('p','in');
    this.doc.setFont("verdana");
    this.doc.setFontType("normal");

    // Document structure
    this.createStructure();

    // Title
    this.addPageHeader();

    // Print the questions
    var answer;
    var questions = QuestionManager.getQuestions(FormManager.formInProgress.checklistId);
    for (var i = 0; i < questions.length; i++) {
      
      // Question title
      this.addOffset(this.marginTopA);
      this.doc.setFontType("bold");
      this.doc.setFontSize(this.sizeB);
      lines = this.doc.splitTextToSize(questions[i].question, this.paragraphWithA);
      this.addQuestionTitle(lines);

      // Values
      this.doc.setFontType("normal");
      this.doc.setFontSize(this.sizeA);
      answer = QuestionManager.getQuestionStoredValue(questions[i].id);

      // Unanswered
      if (answer === null) {
        this.doc.text(this.textMargin, this.verticalOffset, '-');
        this.addOffset(this.marginTopA);
        continue;
      }

      // Boolean
      if (!Helper.isEmpty(answer.boolean)) {
        if (answer.boolean == 1) {
          this.doc.text(this.textMargin, this.verticalOffset, LocaleManager.get('yes') + '.');
        } if (answer.boolean == 0) {
          this.doc.text(this.textMargin, this.verticalOffset, LocaleManager.get('no') + '.');
        }
        if (!Helper.isEmpty(answer.text)) {
          this.addOffset(this.marginTopB);
        }
      }
      
      // Text
      if (!Helper.isEmpty(answer.text)) {
        this.addParagraph(answer.text);
      }
      
      // Images
      if (!Helper.isEmpty(answer.images)) {
        var extraMargin = 0;
        var aux = answer.images.length + 1;
        for (var j = 1; j < aux; j++) {
          if (j % 2 === 0) {
            // Right column
            extraMargin += 2.8;
          } else if (j > 1) {
            extraMargin = 0;
            this.addOffset(2.8);
          }
          this.addImage(answer.imagesBase64[j-1], this.textMargin + extraMargin);
        }
        this.addOffset(this.imgVerticalOffset);
      }

      // Select
      if (!Helper.isEmpty(answer.value)) {
        if (typeof questions[i].options[answer.value - 1] !== 'undefined') {
          this.doc.text(this.textMargin, this.verticalOffset, questions[i].options[answer.value - 1] + '.');
        } else {
          this.doc.text(this.textMargin, this.verticalOffset, '-');
        }
      }

      this.addOffset(this.marginTopA);
    }

    // Signature
    this.addOffset(0.5);
    this.doc.text(this.textMargin, this.verticalOffset, 'Firmado');
    this.addOffset(this.marginTopA);
    var signature = this.getSignature();
    this.doc.addImage(signature, 'PNG', this.textMargin, this.verticalOffset);

    // Reset vertical offset for next document
    this.resetOffset();

    // Return pdf data
    return this.doc.output();
    // this.doc.save('Test.pdf');
  },

  /**
  * Returns the signature image data
  **/
  getSignature: function()
  {
    // Libs
    RequestManager.includeScript('lib/canvg/rgbcolor');
    RequestManager.includeScript('lib/canvg/stackBlur');
    RequestManager.includeScript('lib/canvg/canvg.min');

    // Use canvas to covert svg to png
    var imgSrc = $("#signatureImage").attr('src').replace('data:image/svg+xml,', '');
    var svg = imgSrc.replace(/<\?xml.+<svg/, '<svg');
    canvg('canvas', svg);

    return canvas.toDataURL("image/png");
  },

  // Resets the offset
  resetOffset: function()
  {
    this.verticalOffset = this.initVerticalOffset;
  }
};
