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
        '<input type="text" name="password" id="password">' +
      '</div>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="login" class="button" href="#">Login</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  fieldsAreCompleted: function() {
    return (
      $('#user').val() !== '' &&
      $('#password').val() !== ''
    );
  },
  menuActions: function() {
    var self = this;
    // Login
    $("#login").on('click', function(e) {
      e.preventDefault();
      if (self.fieldsAreCompleted()) {
        // Go to home page
        Helper.loadView('Home');
      } else {
        // User must login
        Helper.showAlert('Complete usuario y contraseña', 'Aviso');
      }
    });
  },

  render: function() {
    $(".app").html(this._template);
    this.menuActions();
  }
};