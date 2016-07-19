var ErrorView = {

  _template:
    '<div id="error_view" class="center_screen">' +
      '<p>Ocurrió un error, si el problema persiste por favor contacta con nosotros</p>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="error" class="button" href="#">Inicio</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  menuActions: function() {
    $("#error").on('click', function(e) {
      e.preventDefault();
      app.initialize();
    });
  },

  render: function() {
    $(".app").html(this._template);
    this.menuActions();
  }
};