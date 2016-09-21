var Menu = {

  _template:
    '<div id="menu">' +
      '<a id="my_account" href="#">' +
        '<div class="col-3">' +
          '<i class="flaticon-user"></i>' +
          '--myAccount--' +
        '</div>' +
      '</a>' +
      '<a id="documents_list" href="#">' +
        '<div class="col-3">' +
          '<i class="flaticon-list-3"></i>' +
          '--seeDocs--' +
        '</div>' +
      '</a>' +
      '<a id="new_form" href="#">' +
        '<div class="col-3">' +
          '<i class="flaticon-list-1"></i>' +
          '--initForm--' +
        '</div>' +
      '</a>' +
    '</div>',

  initMenu: function()
  {
    // My account
    $('#my_account').on('click', function(e) {
      e.preventDefault();
      if (!app.inHome()) {
        RequestManager.loadView('Home');
      }
    });

    // Document list
    $('#documents_list').on('click', function(e) {
      e.preventDefault();
      
      // Check if profile is complete
      if (app.isProfileComplete()) {
        boat = FormManager.tripInfo.boat;
        RequestManager.loadView('Documents', { boat: boat });
      } else {
        Helper.showAlert(LocaleManager.get('completeProfile'), LocaleManager.get('notice'));
      }
    });

    // New form
    $('#new_form')
      .on('click', function(e) {
        e.preventDefault();
        // Check form exists
        if (FormManager.hasForm()) {

          // Check if profile is complete
          if (app.isProfileComplete()) {
            RequestManager.loadView('FormCategory');
          } else {
            Helper.showAlert(LocaleManager.get('completeProfile'), LocaleManager.get('notice'));
          }

        } else {
          Helper.showAlert(LocaleManager.get('notAvailableForm'), LocaleManager.get('notice'));
        }
      });
  },

  render: function()
  {
    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      self.initMenu();
    });

    return this._template;
  }
};