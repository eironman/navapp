// Page to start or continue a form
var HomeView = {

  _template:
    '<div id="HomeView">' +
      '<h1>--init--</h1>' +
      '<div class="form_field form_field_text">' +
        '<label for="navigation_number">--navNum--</label>' +
        '<input type="text" name="navigation_number" id="navigation_number">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="date">--date--</label>' +
        '<input type="date" id="date">' +
      '</div>' +
      '<div class="form_field form_field_text">' +
        '<label for="captain">--captain--</label>' +
        '<input type="text" name="captain" id="captain">' +
      '</div>' +
      '<ul class="list_a">' +
        '<li>' +
          '<a id="new_form" class="button button_inactive" href="#">--initForm--</a>' +
        '</li>' +
        '<li>' +
          '<a id="continue_form" class="button button_inactive" href="#">--contForm--</a>' +
        '</li>' +
        '<li>' +
          '<a id="documents_list" class="button button_inactive" href="#">' +
            '--seeDocs--' +
          '</a>' +
        '</li>' +
        '<li>' +
          '<a id="logout" class="button" href="#">' +
            '--logout-- ({{user}})' +
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

        HomeView.storeTrip();
        RequestManager.loadView('FormCategory');
        
      } else {
        Helper.showAlert(LocaleManager.get('completeAllFields'), LocaleManager.get('notice'));
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
      if (HomeView.areFormFieldsCompleted()) {
        HomeView.storeTrip();
        RequestManager.loadView('FormChecklist', FormManager.getFormInProgressId());
      } else {
        Helper.showAlert(LocaleManager.get('completeAllFields'), LocaleManager.get('notice'));
      }
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
      Helper.showAlert(LocaleManager.get('errorGettingForm'));
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
      Helper.formatDate()
    );
  },

  storeTrip: function()
  {
    FormManager.storeTrip(
      $('#navigation_number').val(),
      $('#date').val(),
      $('#captain').val()
    );
  },

  menuActions: function()
  {
    var self = this;

    // Logout
    $("#logout").on('click', function(e) {
      e.preventDefault();
      app.logout();
    });

    // Timeout to give time to retrieve the documents generated
    window.setTimeout(function(){
      if (typeof PdfManager !== 'undefined') {
        if (PdfManager.documentsGenerated.length > 0) {
          HomeView.activateDocumentsButton();
        }
      }
    }, 300);
  },

  render: function(data)
  {
    var template = this._template.replace('{{user}}', app.loggedUser);
    app.loadHtmlContent(template);
    this.menuActions();
    this.loadTripData();

    // TODO: Retrieve form template based on the form date

    if (typeof data !== 'undefined' && data.requestData) {
      // Retrieve form template
      Helper.showLoader(LocaleManager.get('gettingForm'));
      RequestManager.getFormTemplate(this.enableFormButtons);
      RequestManager.getClientInfo();
    } else {
      this.enableFormButtons();
    }
  }
};