// Generates the pdf content
var PdfContentGenerator = {
  
  doc               : null,
  initVerticalOffset: 0.5,
  verticalOffset    : 0.5,
  maxVerticalOffset : 11,
  imgVerticalOffset : 2.5,

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
  },

  createPdfContent: function()
  {
    Helper.includeScript('lib/jspdf/jspdf.min');

    console.log("generating pdf...");
    this.doc = new jsPDF('p','in');
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
    this.addOffset(0.25);

    // Print the questions
    var answer;
    var questions = QuestionManager.getQuestions(FormManager.formInProgress.checklistId);
    for (var i = 0; i < questions.length; i++) {
      
      // Question title
      this.addOffset(0.1);
      this.doc.setFont("helvetica");
      this.doc.setFontType("bold");
      this.doc.setFontSize(sizeB);
      lines = this.doc.splitTextToSize(questions[i].question, 7.5);
      this.doc.text(margin, this.verticalOffset + sizeB / 72, lines);
      this.addOffset((lines.length + 1.2) * sizeB / 72);

      // Values
      this.doc.setFontSize(sizeA);
      this.doc.setFont("courier");
      this.doc.setFontType("normal");
      answer = QuestionManager.getQuestionStoredValue(questions[i].id);

      // Unanswered
      if (answer === null) {
        this.doc.text(margin, this.verticalOffset, '-');
        this.addOffset(0.2);
        continue;
      }

      // Boolean
      if (!Helper.isEmpty(answer.boolean)) {
        if (answer.boolean == 1) {
          this.doc.text(margin, this.verticalOffset, 'Sí.');
        } if (answer.boolean == 0) {
          this.doc.text(margin, this.verticalOffset, 'No.');
        }
        this.addOffset(0.2);
      }
      
      // Text
      if (!Helper.isEmpty(answer.text)) {
        lines = this.doc.splitTextToSize(answer.text, 7.5);
        this.doc.text(margin, this.verticalOffset, lines);
        this.addOffset((lines.length + 1) * sizeA / 72);
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
            this.addOffset(2.8);
          }
          this.addImage(answer.imagesBase64[j], margin + extraMargin);
        }
        this.addOffset(this.imgVerticalOffset);
      }

      // Select
      if (!Helper.isEmpty(answer.value)) {
        if (typeof questions[i].options[answer.value - 1] !== 'undefined') {
          this.doc.text(margin, this.verticalOffset, questions[i].options[answer.value - 1] + '.');
        } else {
          this.doc.text(margin, this.verticalOffset, '-');
        }
        this.addOffset(0.2);
      }

      this.addOffset(0.4);
    }

    // Signature
    this.addOffset(0.5);
    this.doc.text(margin, this.verticalOffset, 'Firmado');
    this.addOffset(0.1);
    this.doc.addImage(this.getSignature(), 'PNG', margin, this.verticalOffset);

    // Return pdf data
    return this.pdfOutput = this.doc.output();
    // this.doc.save('Test.pdf');
  },

  /**
  * Returns the signature image data
  **/
  getSignature: function()
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

  // Resets the offset
  resetOffset: function()
  {
    this.verticalOffset = this.initVerticalOffset;
  }
};
