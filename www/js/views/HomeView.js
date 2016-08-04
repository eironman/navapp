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
        '<input type="date" id="date">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="captain">Capitán</label>' +
        '<input type="text" name="captain" id="captain">' +
      '</div>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="new_form" class="button button_inactive" href="#">Iniciar formulario</a>' +
        '</li>' +
        '<li>' +
          '<a id="continue_form" class="button button_inactive" href="#">Continuar formulario</a>' +
        '</li>' +
        '<li>' +
          '<a id="documents_list" class="button button_inactive" href="#">' +
            'Ver documentos generados' +
          '</a>' +
        '</li>' +
        '<li>' +
          '<a id="logout" class="button" href="#">' +
            'Logout ({{user}})' +
          '</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  // Activates button to start a new form
  activateStartFormButton: function()
  {
    $('#new_form')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      if (HomeView.areFormFieldsCompleted()) {
        Helper.loadView('FormCategory');
      } else {
        Helper.showAlert('Complete todos los campos por favor', 'Aviso');
      }
    });
  },

  // Activates the button to continue a form in progress
  activateContinueButton: function()
  {
    $('#continue_form')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      Helper.loadView('FormChecklist', FormManager.getFormInProgressId());
    });
  },

  // Activates the button to see the documents generated
  activateDocumentsButton: function()
  {
    $('#documents_list')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      Helper.loadView('Documents');
    });
  },

  areFormFieldsCompleted: function()
  {
    return (
      $('#navigation_number').val() !== '' &&
      $('#date').val() !== '' &&
      $('#captain').val() !== ''
    );
  },

  // Loads trip data into the inputs
  loadTripData: function()
  {
    if (FormManager.tripInfo !== null) {
      $('#navigation_number').val(FormManager.tripInfo.navigationNumber);
      $('#date').val(FormManager.tripInfo.date);
      $('#captain').val(FormManager.tripInfo.captain);
    }
  },

  menuActions: function()
  {
    var self = this;

    // Logout
    $("#logout").on('click', function(e) {
      e.preventDefault();
      app.removeStoredUser();
      Helper.loadView('Login');
    });

    // Store trip data
    $("input").on('blur', function(){
      if (self.areFormFieldsCompleted()) {
        FormManager.storeTrip(
          $('#navigation_number').val(),
          $('#date').val(),
          $('#captain').val()
        );
      }
    });
  },

  render: function()
  {
    var template = this._template.replace('{{user}}', app.loggedUser);
    app.loadHtmlContent(template);
    this.menuActions();
    this.loadTripData();

    // Retrieve form template
    if (!FormManager.hasForm()) {
      FormManager.getFormTemplate(this.activateStartFormButton);
    } else {
      this.activateStartFormButton();
    }

    // Check if user can continue a form in progress
    if (FormManager.isFormInProgress()) {
      this.activateContinueButton();
    }
    
    // Timeout to give time to retrieve the documents generated
    window.setTimeout(function(){
      if (typeof PdfManager !== 'undefined') {
        if (PdfManager.documentsGenerated.length > 0) {
          HomeView.activateDocumentsButton();
        }
      }
    }, 200);
  }
};