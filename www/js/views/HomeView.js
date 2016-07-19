// Page to start or continue a form
var HomeView = {

  _template:
    '<div id="HomeView">' +
      '<h1>Inicio</h1>' +
      '<div class="form_field form_field_text">' +
        '<label for="navigation_number">Nº Navegación</label>' +
        '<input type="text" name="navigation_number" id="navigation_number">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="date">Fecha</label>' +
        '<input type="text" name="date" id="date">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="captain">Capitán</label>' +
        '<input type="text" name="captain" id="captain">' +
      '</div>' +
      '<ul class="menu">' +
        '<li>' +
          '<a id="new_form" class="button" href="#">Iniciar formulario</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  _continueButton: 
    '<li>' +
      '<a id="continue_form" class="button" href="#">Continuar formulario</a>' +
    '</li>',

  fieldsAreCompleted: function() {
    return (
      $('#navigation_number').val() !== '' &&
      $('#date').val() !== '' &&
      $('#captain').val() !== ''
    );
  },
  menuActions: function() {
    var self = this;
    // Start new form
    $("#new_form").on('click', function(e) {
      e.preventDefault();
      if (self.fieldsAreCompleted()) {
        Helper.loadView('FormCategory');
      } else {
        Helper.showAlert('Complete todos los campos por favor', 'Aviso');
      }
    });

    if (FormManager.isFormInProgress()) {
      // TODO: Continue a form in progress
      $("#continue_form").on('click', function(e) {
        e.preventDefault();
        Helper.loadView('FormCategory');
      });
    }
  },

  render: function() {
    $(".app").html(this._template);
    if (FormManager.isFormInProgress()) {
      $("#HomeView .menu").append(this._continueButton);
    }
    this.menuActions();
  }
};