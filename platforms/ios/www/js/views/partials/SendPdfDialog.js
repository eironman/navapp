var SendPdfDialog = {

  _fileNameToSend: null,
  _template      :
    '<div id="send_pdf_overlay" class="overlay_modal">' +
      '<div class="send_pdf_dialog center_screen">' +
        LocaleManager.get('sendTo') +
        '<br />' +
        '<input type="text" name="send_to" id="send_to" class="input_a" />' +
        '<br />' +
        '<p>(' + LocaleManager.get('onlyOneEmail') + ')</p>' +
        '<p class="error_message"></p>' +
        '<ul class="list_b">' +
          '<li class="close">' +
            '<a id="close" href="#">' + LocaleManager.get('cancel') + '</a>' +
          '</li>' +
          '<li class="send">' +
            '<a id="send" href="#">' + LocaleManager.get('send') + '</a>' +
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
      var email = $('#send_to').val().trim();
      if (Helper.isEmpty(email)) {
        return;
      }
      
      if (!Helper.validateEmail(email)) {
        $('.send_pdf_dialog .error_message').html(LocaleManager.get('incorrectEmail'));
        return;
      }

      // Send the pdf
      RequestManager.preparePdfDataAndSendIt(self._fileNameToSend, email);
      $('#send_pdf_overlay').remove();
    });

    // Input
    $('#send_to').on('focus', function() {
      $('.send_pdf_dialog .error_message').html('');
    });
  },

  render: function(fileNameToSend)
  {
    this._fileNameToSend = fileNameToSend;
    $('body').append(this._template);
    this.actions();
  }
};