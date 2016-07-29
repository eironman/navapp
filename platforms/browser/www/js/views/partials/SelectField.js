var SelectField = {

  _template:
    '<div class="form_field form_field_select">' +
      '<p>{{question}}</p>' +
      '<select name="select_{{id}}">' +
        '<option value="0">-</option>' +
        '{{options}}' +
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

  // Generates options for the select
  generateOptions: function(options)
  {
    var html;
    for (var i = 0; i < options.length; i++) {
      html += '<option value="' + (i + 1) + '">' + options[i] + '</option>';
    }

    return html;
  },

  render: function(data, storedValue)
  {
    // Actions
    var self = this;
    $(".app").on('htmlContentLoaded', function() {
      self.actions(data.id);
      if (storedValue) {
        self.loadStoredValue(data.id, storedValue);
      }
    });

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    template = template.replace(/{{options}}/g, this.generateOptions(data.options));
    return template;
  }
};