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
          '<a id="new_form" class="button" href="#">Iniciar formulario</a>' +
        '</li>' +
        '<li>' +
          '<a id="continue_form" class="button button_inactive" href="#">Continuar formulario</a>' +
        '</li>' +
        '<li>' +
          '<a id="documents_list" class="button button_inactive" href="#">' +
            'Ver documentos generados' +
          '</a>' +
        '</li>' +
      '</ul>' +
    '</div>',

  activateContinueButton: function()
  {
    $('#continue_form')
    .removeClass('button_inactive')
    .on('click', function(e) {
      e.preventDefault();
      Helper.loadView('FormChecklist', FormManager.getFormInProgressId());
    });
  },

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

    // Start new form
    $("#new_form").on('click', function(e) {
      e.preventDefault();
      if (self.areFormFieldsCompleted()) {
        Helper.loadView('FormCategory');
      } else {
        Helper.showAlert('Complete todos los campos por favor', 'Aviso');
      }
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
    app.loadHtmlContent(this._template);
    this.menuActions();
    this.loadTripData();

    // Continue a form in progress
    if (FormManager.isFormInProgress()) {
      this.activateContinueButton();
    }
    
    // TODO: Remove timeout when the first page loaded is not Home
    window.setTimeout(function(){
      if (typeof PdfManager !== 'undefined') {
        if (PdfManager.documentsGenerated.length > 0) {
          HomeView.activateDocumentsButton();
        }
      }
    }, 300);
    
    /*if (PdfManager.documentsGenerated.length > 0) {
      HomeView.activateDocumentsButton();
    }*/
  }
};