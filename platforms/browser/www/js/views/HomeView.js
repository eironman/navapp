// Page to start or continue a form
var HomeView = {

  _template:
    '<div id="contenedor">' +
      '<div id="top">' +
        '<div class="titulo">--init--</div>' +
      '</div>' +
      '<div id="contenido">' +
        '<div id="login">' +
          '<div class="contenido">' +
            '<img src="img/logo.png" width="50" alt="logo" />' +
            '<h1>{{user}}</h1>' +
            '<form>' +
              '<input type="text" class="form" placeholder="--captain--" id="captain" />' +
              '<input type="date" class="form" placeholder="--date--" id="date" />' +
              '<input type="text" class="form" placeholder="--navNum--" id="navigation_number" />' +
              '<select class="form" id="select_boat">' +
                '<option value="">--selectBoat--</option>' +
              '</select>' +
              '<input type="button" class="buttonclose" value="--logout--" id="logout" />' +
            '</form>' +
          '</div>' + // class contenido
        '</div>' + // id login
        '<div id="push"></div>' +
      '</div>' + // id contenido
    '</div>', // id contenedor

  areFormFieldsCompleted: function()
  {
    return (
      $('#navigation_number').val() !== '' &&
      $('#date').val() !== '' &&
      $('#captain').val() !== '' &&
      $('#select_boat').val() !== ''
    );
  },

  // Shows the list of boats
  loadBoatOptions: function()
  {
    var clientInfo = StorageManager.get('navalClient', true);
    var boats = clientInfo.flota.trim().split('||');
    var options = '';
    var boat;
    for (var i = 0; i < boats.length; i++) {
      boat = Helper.escapeHtml(boats[i].trim());
      options += '<option value="' + boat + '">' + boat + '</option>';
    }
    $('#select_boat')
    .append(options)
    .change(function(e) {
      HomeView.onBoatSelect(e);
    });
  },

  // Loads trip data into the inputs
  loadTripData: function()
  {
    this.loadBoatOptions();
    
    if (FormManager.tripInfo !== null) {
      $('#navigation_number').val(FormManager.tripInfo.navigationNumber);
      $('#captain').val(FormManager.tripInfo.captain);

      // Date
      if (FormManager.tripInfo.date === null) {
        this.loadDefaultDate();
      } else {
        $('#date').val(FormManager.tripInfo.date);
      }

      // Boat
      $('#select_boat').val(FormManager.tripInfo.boat);

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

  // When user chooses a boat, create boat directory to store documents
  onBoatSelect: function(e)
  {
    var boat = e.target.value;
    if (!Helper.isEmpty(boat)) {
      app.createUserStorageDirectory(boat);
    }
  },

  storeTrip: function()
  {
    FormManager.storeTrip(
      $('#navigation_number').val(),
      $('#date').val(),
      $('#captain').val(),
      $('#select_boat').val()
    );
  },

  menuActions: function()
  {
    var self = this;

    // Logout
    $("#logout").on('click', function(e) {
      e.preventDefault();
      app.confirmLogout();
    });
  },

  render: function()
  {
    var template = this._template.replace('{{user}}', app.loggedUser);
    app.loadHtmlContent(template);
    this.menuActions();
    this.loadTripData();

    // Alert if form is not available
    if (!FormManager.hasForm()) {
      Helper.showAlert(LocaleManager.get('errorGettingForm'));
    }
  }
};