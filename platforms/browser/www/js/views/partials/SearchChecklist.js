var SearchChecklist = {

  _template:
    '<div id="checklist_options_container">' +
      '<input type="text" class="input_a" id="checklist_options" placeholder="--searchChecklist-- ...">' +
    '</div>',

  initAutocomplete: function()
  {
    var checklists = CategoryManager.getChecklistsForAutocomplete();
    var self = this;
    $("#checklist_options").autocomplete({
      minLength: 3,
      source   : checklists,
      select   : self.onChecklistSelected
    });
  },

  onChecklistSelected: function(e, ui) {
    FormManager.shouldInitForm(ui.item.id, function(){
      RequestManager.loadView('FormChecklist', ui.item.id);
    });
  },

  render: function()
  {
    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      self.initAutocomplete();
    });

    return this._template;
  }
};