var SendPdfDialog = {

  _fileToSend: null,
  _template:
    '<div id="send_pdf_overlay" class="overlay_modal">' +
      '<div class="send_pdf_dialog center_screen">' +
        '<label>' + LocaleManager.get('sendTo') + '</label>' +
        '<br />' +
        '<input type="text" name="send_to" id="send_to" class="input_a" />' +
        '<br />' +
        '<p>(Separar los correos mediante coma)</p>' +
        '<br />' +
        '<p class="error_message"></p>' +
        '<ul class="list_b">' +
          '<li class="close">' +
            '<a id="close" class="button" href="#">' + LocaleManager.get('cancel') + '</a>' +
          '</li>' +
          '<li class="send">' +
            '<a id="send" class="button" href="#">' + LocaleManager.get('send') + '</a>' +
          '</li>' +
        '</ul>' +
      '</div>' +
    '</div>',

  actions: function()
  {
    // Close
    $('#close').on('click', function() {
      $('#send_pdf_overlay').remove();
    });

    // Send
    var self = this;
    $('#send').on('click', function() {
      var emails = $('#send_to').val().trim();
      if (Helper.isEmpty(emails)) {
        return;
      }
      
      if (!self.validateEmails(emails)) {
        $('.send_pdf_dialog .error_message').html(LocaleManager.get('incorrectEmails'));
        return;
      }

      // Send the file
      FileManager.readFile(
        app.storageDirectory + self._fileToSend,
        function() {
          RequestManager.sendPdfToServer(this.result, emails);
        }
      );
    });

    // Input
    $('#send_to').on('focus', function() {
      $('.send_pdf_dialog .error_message').html('');
    });
  },

  validateEmails: function(emails)
  {
    var emailsArr = emails.split(',');
    for (var i = 0; i < emailsArr.length; i++) {
      if (!Helper.validateEmail(emailsArr[i].trim())) {
        return false;
      }
    }

    return true;
  },

  render: function(fileToSend)
  {
    this._fileToSend = fileToSend;
    $('body').append(this._template);
    this.actions();
  }
};