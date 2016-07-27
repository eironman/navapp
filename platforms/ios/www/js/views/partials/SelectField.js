var SelectField = {

  _template:
    '<div class="form_field form_field_select">' +
      '<p>{{question}}</p>' +
      '<select name="select_{{id}}">' +
        '<option value="value1">Peligrosa</option>' +
        '<option value="value2">Muy peligrosa</option>' +
      '</select>' +
    '</div>',

  render: function(data)
  {
    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    return template;
  }
};