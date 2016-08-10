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

        FormManager.storeTrip(
          $('#navigation_number').val(),
          $('#date').val(),
          $('#captain').val()
        );
        RequestManager.loadView('FormCategory');
        
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
      RequestManager.loadView('FormChecklist', FormManager.getFormInProgressId());
    });
  },

  // Activates the button to see the documents generated
  activateDocumentsButton: function()
  {
    $('#documents_list')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      RequestManager.loadView('Documents');
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

  enableFormButtons: function()
  {
    Helper.hideLoader();

    if (FormManager.hasForm()) {

      // Activate start form button
      HomeView.activateStartFormButton();

      // Check if user can continue a form in progress
      if (FormManager.isFormInProgress()) {
        HomeView.activateContinueButton();
      }
      
    } else {
      Helper.showAlert('No se pudo obtener el formulario. Intente loguearse de nuevo por favor.');
    }
  },

  // Loads trip data into the inputs
  loadTripData: function()
  {
    if (FormManager.tripInfo !== null) {
      $('#navigation_number').val(FormManager.tripInfo.navigationNumber);
      $('#captain').val(FormManager.tripInfo.captain);

      // Date
      if (FormManager.tripInfo.date === null) {
        this.loadDefaultDate();
      } else {
        $('#date').val(FormManager.tripInfo.date);
      }
    } else {
      this.loadDefaultDate();
    }
  },

  // Shows today's date in date input
  loadDefaultDate: function()
  {
    var date = new Date();
    $('#date').val(
      date.getFullYear() + '-' +
      Helper.pad(date.getMonth() + 1, 2) + '-' +
      Helper.pad(date.getDate(), 2)
    );
  },

  // When user logs out
  logout: function()
  {
    app.removeStoredUser();
    FormManager.removeStoredTrip();
    FormManager.removeStoredForm();
    FormManager.removeStoredFormInProgress();
    RequestManager.loadView('Login');
  },

  menuActions: function()
  {
    var self = this;

    // Logout
    $("#logout").on('click', function(e) {
      e.preventDefault();
      if (FormManager.isFormInProgress()) {
        
        Helper.showConfirm(
          'Hay un formulario en progreso, si sale perderá el actual, ¿desea continuar?',
          function(buttonPressed) {
            if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
              self.logout();
            }
          }
        );

      } else {
        self.logout();
      }
    });

    // Timeout to give time to retrieve the documents generated
    window.setTimeout(function(){
      if (typeof PdfManager !== 'undefined') {
        if (PdfManager.documentsGenerated.length > 0) {
          HomeView.activateDocumentsButton();
        }
      }
    }, 400);
  },

  render: function(data)
  {
    var template = this._template.replace('{{user}}', app.loggedUser);
    app.loadHtmlContent(template);
    this.menuActions();
    this.loadTripData();

    // TODO: Retrieve form template based on the form date

    // Retrieve form template
    if (typeof data !== 'undefined' && data.requestData) {
      Helper.showLoader('Obteniendo formulario');
      RequestManager.getFormTemplate(this.enableFormButtons);
      RequestManager.getClientInfo();
    } else {
      this.enableFormButtons();
    }
  }
};