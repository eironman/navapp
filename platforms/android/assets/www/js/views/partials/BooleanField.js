var BooleanField = {

  _template:
    '<div class="form_field form_field_boolean">' +
      '<p>{{question}}</p>' +
      '<input type="radio" name="bool_field_{{id}}" value="1" id="bool_field_{{id}}_1">' +
      '<label for="bool_field_{{id}}_1"> Sí</label>' +
      '<input type="radio" name="bool_field_{{id}}" value="0" id="bool_field_{{id}}_2">' +
      '<label for="bool_field_{{id}}_2"> No</label>' +
      '<br>' +
      '<textarea name="annotations_{{id}}" class="mt15" rows="6"></textarea>' +
      '{{picture}}' +
    '</div>',

  render: function(data)
  {
    Helper.includeScript('views/partials/TakePicture');

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    template = template.replace(/{{picture}}/g, TakePicture.render(data));
    return template;
  }
};