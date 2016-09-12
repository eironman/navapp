// Page to login
var LoginView = {

  _template:
    '<div id="LoginView">' +
      '<h1>Identificación</h1>' +
      '<div class="form_field form_field_text">' +
        '<label for="user">--user--</label>' +
        '<input type="text" name="user" id="user">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="password">--pass--</label>' +
        '<input type="password" name="password" id="password">' +
      '</div>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="login" class="button" href="#">--login--</a>' +
        '</li>' +
      '</ul>' +
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
    $("#login").on('click', function(e) {
      e.preventDefault();
      if (self.fieldsAreCompleted()) {
        // Login
        app.login($('#user').val(), $('#password').val());

      } else {
        // All fields must be filled
        Helper.showAlert(LocaleManager.get('completeLogin'), LocaleManager.get('notice'));
      }
    });
  },

  render: function() {
    app.loadHtmlContent(this._template);
    this.menuActions();
  }
};
