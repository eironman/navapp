// Page to login
var LoginView = {

  _template:
    '<div id="login" class="login_view">' +
      '<div class="contenido">' +
        '<img src="img/logo.png" width="100" alt="logo" />' +
        '<br><br>' +
        '<h1><i class="flaticon-user"></i></h1>' +
        '<form>' +
          '<input class="form" type="text" placeholder="--user--" id="user" />' +
          '<input class="form" type="password" placeholder="--pass--" id="password" />' +
          '<input class="button" type="button" value="--login--" id="login_button" />' +
        '</form>' +
        '<br><br>' +
        '<a id="ask_password" href="#"><i class="flaticon-error"></i> --askPass--</a>' +
      '</div>' +
    '</div>',

  // Checks if login fields are completed
  fieldsAreCompleted: function()
  {
    return (
      $('#user').val() !== '' &&
      $('#password').val() !== ''
    );
  },

  menuActions: function()
  {
    var self = this;

    // Login button
    $("#login_button").on('click', function(e) {
      e.preventDefault();
      if (self.fieldsAreCompleted()) {
        // Login
        app.login($('#user').val(), $('#password').val());

      } else {
        // All fields must be filled
        Helper.showAlert(LocaleManager.get('completeLogin'), LocaleManager.get('notice'));
      }
    });

    // Ask for password
    $("#ask_password").on('click', function(e) {
      Helper.showAlert(LocaleManager.get('howToGetPass'), LocaleManager.get('notice'));
    });
  },

  render: function() {
    app.loadHtmlContent(this._template);
    this.menuActions();
  }
};
