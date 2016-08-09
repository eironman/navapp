// Parses form template
var DataParser = {
  
  parseForm: function(formJSON)
  {
    // Initial root category
    CategoryManager.categories = [];
    var categories = CategoryManager.categories;
    categories.push(
      {
        id      : 0,
        parent  : null,
        name    : 'ÍNDICE',
        children: []
      }
    );

    var questionObj;
    var categoryId, blockId, checklistId, questionId;
    var parentCategory, block, checklist, question;

    for (var i = 0; i < formJSON.form.length; i++) {
      questionObj = formJSON.form[i].pregunta;
      if (questionObj.cat_id !== "" &&
          questionObj.check_id !== "" &&
          questionObj.bloque_id !== "") {
      
        // Parent categories
        categoryId = parseInt(questionObj.cat_id, 10);
        if (!Helper.arrayContains(categories[0].children, categoryId)) {
          categories[0].children.push(categoryId);
          parentCategory = {
            id      : categoryId,
            parent  : 0,
            name    : questionObj.cat,
            children: []
          };
          categories.push(parentCategory);
        } else {
          parentCategory = CategoryManager.getCategory(categoryId);
        }

        // Blocks
        blockId = parseInt(questionObj.bloque_id, 10);
        if (!Helper.arrayContains(parentCategory.children, blockId)) {
          parentCategory.children.push(blockId);
          block = {
            id      : blockId,
            parent  : categoryId,
            name    : questionObj.bloque,
            children: []
          };
          categories.push(block);
        } else {
          block = CategoryManager.getCategory(blockId);
        }

        // Checklists
        checklistId = parseInt(questionObj.check_id, 10);
        if (!Helper.arrayContains(block.children, checklistId)) {
          block.children.push(checklistId);
          checklist = {
            id       : checklistId,
            parent   : blockId,
            name     : questionObj.check,
            num      : questionObj.check_num,
            children : [],
            questions: []
          };
          categories.push(checklist);
        } else {
          checklist = CategoryManager.getCategory(checklistId);
        }

        // Questions
        questionId = parseInt(questionObj.pregunta_id, 10);
        if (!Helper.arrayContains(checklist.questions, questionId)) {
          question = {
            id      : questionId,
            type    : parseInt(questionObj.Tipo, 10),
            question: questionObj.pregunta,
            options : []
          };
          checklist.questions.push(question);
        }
      }
    }
  }
}