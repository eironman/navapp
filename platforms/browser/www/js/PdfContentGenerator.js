// Generates the pdf content
var PdfContentGenerator = {
  
  doc               : null,
  sizeA             : 12, // Font sizes
  sizeB             : 14,
  sizeC             : 16,
  textMargin        : 0.6,
  initVerticalOffset: 0.8,
  verticalOffset    : 0.8,
  maxVerticalOffset : 11,
  imgVerticalOffset : 2.5,
  lineMargin        : 0.4,
  lineVerticalOffset: 0.3,
  lineMaxOffset     : 11.3,

  // Attaches an image to the document
  addImage: function(imgUri, margin)
  {
    if ( (this.verticalOffset + this.imgVerticalOffset) > this.maxVerticalOffset ) {
      this.addPage();
    }
    this.doc.addImage(imgUri, 'JPG', margin, this.verticalOffset);
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
    var lines = this.doc.splitTextToSize(text, 7);
    var textOffset = (lines.length + 2.5) * this.sizeA / 72;
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

  // Pdf page header
  addPageHeader: function()
  {
    var clientInfo = StorageManager.get('navalClient', true);
    console.log(clientInfo);
    
    // Checklist name
    this.doc.setFontSize(this.sizeC);
    var category = CategoryManager.getCategory(FormManager.formInProgress.checklistId);
    this.doc.text(this.textMargin, this.verticalOffset, category.name);
    this.addOffset(0.25);

    // Client name
    this.doc.setFontSize(this.sizeA);
    this.doc.text(this.textMargin, this.verticalOffset, clientInfo.razon_social);
    this.addOffset(0.2);

    // Legal info
    var lines = this.doc.splitTextToSize(clientInfo.textos_legales, 7);
    var textOffset = (lines.length + 2) * this.sizeA / 72;
    this.doc.text(this.textMargin, this.verticalOffset, lines);
    this.addOffset(textOffset);

    // Separation line
    this.doc.setLineWidth(1/72)
    .line(this.textMargin, this.verticalOffset - 0.3, 8.3 - this.textMargin, this.verticalOffset - 0.3);
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

    console.log("generating pdf...");
    var lines; // Lines for paragraphs

    // Init doc
    this.doc = new jsPDF('p','in');
    this.doc.setFont("courier");
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
      this.addOffset(0.1);
      this.doc.setFont("helvetica");
      this.doc.setFontType("bold");
      this.doc.setFontSize(this.sizeB);
      lines = this.doc.splitTextToSize(questions[i].question, 7);
      this.addQuestionTitle(lines);

      // Values
      this.doc.setFontSize(this.sizeA);
      this.doc.setFont("courier");
      this.doc.setFontType("normal");
      answer = QuestionManager.getQuestionStoredValue(questions[i].id);

      // Unanswered
      if (answer === null) {
        this.doc.text(this.textMargin, this.verticalOffset, '-');
        this.addOffset(0.2);
        continue;
      }

      // Boolean
      if (!Helper.isEmpty(answer.boolean)) {
        if (answer.boolean == 1) {
          this.doc.text(this.textMargin, this.verticalOffset, 'Sí.');
        } if (answer.boolean == 0) {
          this.doc.text(this.textMargin, this.verticalOffset, 'No.');
        }
        this.addOffset(0.2);
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
        this.addOffset(0.2);
      }

      this.addOffset(0.4);
    }

    // Signature
    this.addOffset(0.5);
    this.doc.text(this.textMargin, this.verticalOffset, 'Firmado');
    this.addOffset(0.1);
    this.doc.addImage(this.getSignature(), 'PNG', this.textMargin, this.verticalOffset);

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
