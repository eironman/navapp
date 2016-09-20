var ContinueForm = {

  _template:
    '<div class="current"><a id="continue_form" href="#"><span class="blink">1</span></a></div>',

  action: function()
  {
    $('.titulo').after(this._template);
    $('#continue_form').on('click', function(e) {
      e.preventDefault();

      // Check if it's home view
      if (app.inHome()) {
        if (HomeView.areFormFieldsCompleted()) {
          HomeView.storeTrip();
        } else {
          Helper.showAlert(LocaleManager.get('completeAllFields'), LocaleManager.get('notice'));
          return;
        }
      } else {
        // Check if trip info is completed
        if (FormManager.tripInfo === null) {
          Helper.showAlert(LocaleManager.get('completeProfile'), LocaleManager.get('notice'));
          return;
        }
      }

      RequestManager.loadView('FormChecklist', FormManager.getFormInProgressId());
    });
  },

  render: function()
  {
    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      if (FormManager.isFormInProgress()) {
        self.action();
      }
    });

    return this._template;
  }
};