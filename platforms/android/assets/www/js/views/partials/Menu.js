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
      // Get boat name
      var boat;
      if (app.inHome()) {
        boat = $('#select_boat').val();
        if (HomeView.areFormFieldsCompleted()) {
          HomeView.storeTrip();
        }
      } else {
        boat = FormManager.tripInfo.boat;
      }

      // Load view
      if (Helper.isEmpty(boat)) {
        Helper.showAlert(LocaleManager.get('selectBoat'), LocaleManager.get('notice'));
      } else {
        RequestManager.loadView('Documents', { boat: boat });
      }
    });

    // New form
    $('#new_form')
      .removeClass('button_inactive')
      .on('click', function(e) {
        e.preventDefault();
        // Check form exists
        if (FormManager.hasForm()) {

          // Check trip info is completed
          if (HomeView.areFormFieldsCompleted()) {
            HomeView.storeTrip();
            RequestManager.loadView('FormCategory');
          } else {
            Helper.showAlert(LocaleManager.get('completeAllFields'), LocaleManager.get('notice'));
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