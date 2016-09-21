var ContinueForm = {

  _template:
    '<div class="current"><a id="continue_form" href="#"><span class="blink">1</span></a></div>',

  insertButton: function()
  {
    $('.titulo').after(this._template);
    $('#continue_form').on('click', function(e) {
      e.preventDefault();

      // Check if profile is complete
      if (app.isProfileComplete()) {
        RequestManager.loadView('FormChecklist', FormManager.getFormInProgressId());
      } else {
        Helper.showAlert(LocaleManager.get('completeProfile'), LocaleManager.get('notice'));
      }

    });
  },

  render: function()
  {
    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      if (FormManager.isFormInProgress()) {
        self.insertButton();
      }
    });

    return this._template;
  }
};