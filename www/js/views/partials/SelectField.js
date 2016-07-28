var SelectField = {

  _template:
    '<div class="form_field form_field_select">' +
      '<p>{{question}}</p>' +
      '<select name="select_{{id}}">' +
        '<option value="0">-</option>' +
        '<option value="1">Peligrosa</option>' +
        '<option value="2">Muy peligrosa</option>' +
      '</select>' +
    '</div>',

  actions: function(questionId)
  {
    // Clear previous event
    $('select[name="select_' + questionId + '"]').off('change');

    // Store select
    $('select[name="select_' + questionId + '"]').on('change', function() {
      QuestionManager.storeSelect(questionId, $(this).val());
    });
  },

  loadStoredValue: function(questionId, storedValue)
  {
    $('select[name="select_' + questionId + '"]').val(storedValue.value);
  },

  render: function(data, storedValue)
  {
    var self = this;
    $(".app").on('htmlContentLoaded', function() {
      self.actions(data.id);
      if (storedValue) {
        self.loadStoredValue(data.id, storedValue);
      }
    });

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    return template;
  }
};