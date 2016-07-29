var TextField = {

  _template:
    '<div class="form_field form_field_text">' +
      '<p>{{question}}</p>' +
      '<textarea name="annotations_{{questionId}}" class="mt15" rows="6"></textarea>' +
      '{{picture}}' +
    '</div>',

  actions: function(questionId)
  {
    // Clear previous event
    $('textarea[name="annotations_' + questionId + '"]').off('blur');

    // Store textarea
    $('textarea[name="annotations_' + questionId + '"]').on('blur', function() {
      QuestionManager.storeText(questionId, $(this).val());
    });
  },

  loadStoredValue: function(questionId, storedValue)
  {
    // Textarea
    $('textarea[name="annotations_' + questionId + '"]').val(storedValue.text);
  },

  render: function(data, storedValue)
  {
    Helper.includeScript('views/partials/TakePicture');

    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      self.actions(data.id);
      if (storedValue) {
        self.loadStoredValue(data.id, storedValue);
      }
    });

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{questionId}}/g, data.id);
    template = template.replace(/{{picture}}/g, TakePicture.render(data, storedValue));
    return template;
  }
};