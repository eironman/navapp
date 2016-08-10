var BooleanField = {

  _template:
    '<div class="form_field form_field_boolean">' +
      '<p>{{question}}</p>' +
      '<input type="radio" name="bool_field_{{questionId}}" value="1" id="bool_field_{{questionId}}_1">' +
      '<label for="bool_field_{{questionId}}_1"> --yes--</label>' +
      '<input type="radio" name="bool_field_{{questionId}}" value="0" id="bool_field_{{questionId}}_2">' +
      '<label for="bool_field_{{questionId}}_2"> --no--</label>' +
      '<br>' +
      '<textarea name="annotations_{{questionId}}" class="mt15" rows="6"></textarea>' +
      '{{picture}}' +
    '</div>',

  actions: function(questionId)
  {
    // Clear previous event
    $('input:radio[name="bool_field_' + questionId + '"]').off('click');
    $('textarea[name="annotations_' + questionId + '"]').off('blur');

    // Store radio button
    $('input:radio[name="bool_field_' + questionId + '"]').on('click', function() {
      QuestionManager.storeBoolean(questionId, $(this).val());
    });

    // Store textarea
    $('textarea[name="annotations_' + questionId + '"]').on('blur', function() {
      QuestionManager.storeBoolean(questionId, null, $(this).val());
    });
  },

  loadStoredValue: function(questionId, storedValue)
  {
    if (storedValue) {
      // Radio button
      if (storedValue.boolean !== null) {
        $('input:radio[name="bool_field_' + questionId + '"][value="' + storedValue.boolean + '"]').attr('checked', true);
      }

      // Textarea
      $('textarea[name="annotations_' + questionId + '"]').val(storedValue.text);
    }
  },

  render: function(data, storedValue)
  {
    RequestManager.includeScript('views/partials/TakePicture');

    var self = this;
    $(".app").on('htmlContentLoaded', function() {
      self.actions(data.id, storedValue);
      self.loadStoredValue(data.id, storedValue);
    });

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{questionId}}/g, data.id);
    template = template.replace(/{{picture}}/g, TakePicture.render(data, storedValue));
    return template;
  }
};