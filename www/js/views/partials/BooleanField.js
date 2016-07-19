var BooleanField = {

  _template:
    '<div class="form_field form_field_boolean">' +
      '<p>{{question}}</p>' +
      '<input type="radio" name="bool_field_{{id}}" value="1" id="bool_field_{{id}}_1">' +
      '<label for="bool_field_{{id}}_1"> Sí</label>' +
      '<input type="radio" name="bool_field_{{id}}" value="0" id="bool_field_{{id}}_2">' +
      '<label for="bool_field_{{id}}_2"> No</label>' +
      '<br>' +
      '<textarea name="annotations" class="mt15" rows="6"></textarea>' +
    '</div>',

  render: function(data) {
    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    return template;
  }
};