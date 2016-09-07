var HiddenMenu = {

  _template:
    '<div id="menu" class="sm-main"></div>',

  initMenu: function(triggerId)
  {
    // Creating the master menu
    sideMenu = new SideMenu([
      // Close button
      new SMButtonItem(LocaleManager.get('cerrar'), function() {
        sideMenu.close();
      }),
      // Home button
      new SMButtonItem(LocaleManager.get('init'), function() {
        sideMenu.close();
        RequestManager.loadView('Home');
      })
    ]);

    // Init form
    sideMenu.addItem(
      new SMButtonItem(LocaleManager.get('initForm'), function() {
        sideMenu.close();
        RequestManager.loadView('FormCategory');
      })
    );

    // Continue form
    if (FormManager.isFormInProgress()) {
      sideMenu.addItem(
        new SMButtonItem(LocaleManager.get('contForm'), function() {
          sideMenu.close();
          RequestManager.loadView('FormChecklist', FormManager.getFormInProgressId());
        })
      );
    }

    // Documents
    sideMenu.addItem(
      new SMButtonItem(LocaleManager.get('seeDocs'), function() {
        sideMenu.close();
        RequestManager.loadView('Documents');
      })
    );

    // Logout
    sideMenu.addItem(
      new SMButtonItem(LocaleManager.get('logout'), function() {
        sideMenu.close();
        app.confirmLogout();
      })
    );

    $(function() {
      sideMenu.appendTo(document.getElementById('menu'));
    });

    // Button to open menu
    $("#" + triggerId).on('click', function() {
      sideMenu.open();
    });
  },

  render: function(triggerId)
  {
    var self = this;
    $('.app').on('htmlContentLoaded', function() {
      self.initMenu(triggerId);
    });

    return this._template;
  }
};