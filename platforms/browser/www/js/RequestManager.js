// Does all the requests
var RequestManager = {
  _loadedScripts : [],
  clientDataUrl  : "http://control.nautons.com/jsonclientes",
  formTemplateUrl: "http://control.nautons.com/jsonpreguntas",
  loginUrl       : "http://control.nautons.com/loginapp",
  sendPdfUrl     : "http://www.nautons.com/form/enviar.php",
  
  // Call to get the client info to write in the pdf
  getClientInfo: function(callback)
  {
    if (navigator.onLine) {
      var data = {
        cliente: app.loggedUser
      };

      $.ajax({
        url : this.clientDataUrl,
        data: data
      })
      .done(function(data) {
        // If no client is returned, logout. 
        if (data.clientes.length === 0) {
          console.warn('No client data. Logout from app');
          app.logout();
          Helper.hideLoader();
          Helper.showAlert(LocaleManager.get('userPassError'), LocaleManager.get('error'));
          return;
        }

        // Store in local storage
        StorageManager.set('navalClient', JSON.stringify(data.clientes[0].cliente));
        callback(data.clientes[0].cliente);
      })
      .fail(function(jqxhr, settings, exception) {
        console.error('Client info: ' + exception);
      });
    }
  },

  // Call to get the form template from the server
  getFormTemplate: function(callback)
  {
    if (navigator.onLine) {
      
      var data = {
        usuario: app.loggedUser
      };

      try {
        $.ajax({
          url : this.formTemplateUrl,
          data: data
        })
        .done(function(form) {
          FormManager.form = form;
          StorageManager.set('navalForm', JSON.stringify(form));
          DataParser.parseForm(form);
          callback();
        })
        .fail(function(jqxhr, settings, exception) {
          console.error('Form template: ');
          console.error(exception);
          RequestManager.getFormTemplateFallback();
          callback();
        });
      } catch (e) {
        // try-catch to handle ERR_CONNECTION_REFUSED
        console.warn('Catch: ' + exception );
        RequestManager.getFormTemplateFallback();
        callback();
      }

    } else {
      this.getFormTemplateFallback();
      callback();
    }
  },

  // If getting the form template from server didn't work, use the form in local storage
  getFormTemplateFallback: function()
  {
    if (FormManager.form !== null) {
      console.warn('[WARN] Using form from local storage');
      DataParser.parseForm(FormManager.form);
    } else {
      console.warn('[WARN] There is no form in local storage');
      Helper.showAlert(LocaleManager.get('errorGettingForm'));
    }
  },

  /**
  * Loads a js file
  **/
  includeScript: function(scriptUrl)
  {
    // include script only once
    if (this._loadedScripts.indexOf(scriptUrl) !== -1) {
      return false;
    }

    // request file. jquery executes "eval" atomatically
    $.ajax({
      async   : false,
      dataType: "script",
      url     : "js/" + scriptUrl + ".js"
    })
    .fail(function(jqxhr, settings, exception) {
      console.warn( "Something went wrong " + exception );
    });

    // remember included script
    this._loadedScripts.push(scriptUrl);
  },

  /**
  * Loads a js view file
  **/
  loadView: function(viewName, data)
  {
    app.page = viewName;
    this.includeScript('views/' + viewName +'View');
    if (typeof data === 'undefined') {
      eval(viewName +'View.render()');
    } else {
      eval(viewName +'View.render(data)');
    }
  },

  // Login the user
  login: function(user, pass, callback)
  {
    if (navigator.onLine) {

      $.ajax({
        type: 'POST',
        url : this.loginUrl,
        data: { 
          name: user,
          pass: pass
        }
      })
      .done(function(result) {
        if (result === 'OK') {
          callback(user);
        } else {
          Helper.showAlert(LocaleManager.get('userPassError'), LocaleManager.get('error'));
        }
      })
      .fail(function(jqxhr, settings, exception) {
        console.warn( "Something went wrong " + exception );
      });

    } else {
      Helper.showAlert(LocaleManager.get('noConnection'), LocaleManager.get('notice'));
    }
  },

  /**
  * Reads pdf data before sending it
  **/
  preparePdfDataAndSendIt: function(pdfName, extraEmail)
  {
    if (navigator.onLine) {

      // Read pdf data
      var readPdfAsBinaryString = true;
      FileManager.readFile(
        app.userStorageDirectory + pdfName,
        function() {
          // Send the data read
          RequestManager.sendPdfToServer(this.result, pdfName, extraEmail);
        },
        null,
        readPdfAsBinaryString
      );

    } else {
      Helper.showAlert(LocaleManager.get('docSentErrorNoConnection'), LocaleManager.get('notice'));
    }
  },

  /**
  * Sends the pdf data
  **/
  sendPdfToServer: function(pdfData, pdfName, extraEmail)
  {
    var clientInfo = StorageManager.get('navalClient', true);
    var formData = {
      // Document data
      pdf      : pdfData,
      nombrePdf: pdfName,
      
      // Client email
      emailEnvio : clientInfo.email_envio,
      emailAcceso: clientInfo['email-acceso'],

      // Boat and captain
      buque  : FormManager.tripInfo.boat,
      capitan: FormManager.tripInfo.captain
    };

    // Extra email added by user
    if (!Helper.isEmpty(extraEmail)) {
      formData.extraEmail = extraEmail;
    }

    $.ajax({
      url        : this.sendPdfUrl,
      type       : 'POST',
      data       : formData,
      data       : JSON.stringify(formData),
      cache      : false,
      contentType: false,
      processData: false,
      crossDomain: true
    })
    .done(function(res){
      console.log('[OK] Send pdf to server:');
      console.log(res);
      Helper.showAlert(LocaleManager.get('docSent'), LocaleManager.get('notice'));
    })
    .error(function(e){
      console.error('[ERROR] Send pdf to server:');
      console.error(JSON.stringify(e));
      Helper.showAlert(LocaleManager.get('docSentError'), LocaleManager.get('notice'));
    });
  }
};
