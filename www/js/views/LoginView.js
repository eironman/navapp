// Page to login
var LoginView = {

  _template:
    '<div id="LoginView">' +
      '<h1>Identificación</h1>' +
      '<div class="form_field form_field_text">' +
        '<label for="user">Usuario</label>' +
        '<input type="text" name="user" id="user">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="password">Contraseña</label>' +
        '<input type="password" name="password" id="password">' +
      '</div>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="login" class="button" href="#">Login</a>' +
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
  
  // Login the user
  login: function()
  {
    $.ajax({
      type: 'POST',
      url : app.loginUrl,
      data: { 
        name: $('#user').val(),
        pass: $('#password').val()
      }
    })
    .done(function(result) {
      if (result === 'OK') {
        app.storeLoggedUser($('#user').val());
        Helper.loadView('Home');
      } else {
        Helper.showAlert('Usuario y/o contraseña incorrecto/s', 'Error');
      }
    })
    .fail(function(jqxhr, settings, exception) {
      console.warn( "Something went wrong " + exception );
    });
  },

  menuActions: function()
  {
    var self = this;

    // Login button
    $("#login").on('click', function(e) {
      e.preventDefault();
      if (self.fieldsAreCompleted()) {
        // Try to login
        self.login();
      } else {
        // All fields must be filled
        Helper.showAlert('Complete usuario y contraseña', 'Aviso');
      }
    });
  },

  render: function() {
    app.loadHtmlContent(this._template);
    this.menuActions();
  }
};