var TextField = {

  _template:
    '<div class="form_field form_field_text">' +
      '<p>{{question}}</p>' +
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