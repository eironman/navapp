// Does all the requests
var RequestManager = {
  _loadedScripts : [],
  clientDataUrl  : "http://www.dereksolutions.com/navapp/jsonclientes",
  formTemplateUrl: "http://www.dereksolutions.com/navapp/jsonpreguntas",
  loginUrl       : "http://www.dereksolutions.com/navapp/loginapp",
  sendPdfUrl     : "http://www.dereksolutions.com/navapp/pdfapp",
  
  // Call to get the client info to write in the pdf
  getClientInfo: function()
  {
    if (navigator.onLine) {
      var data = {
        usuario: app.loggedUser
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
          return;
        }

        StorageManager.set('navalClient', JSON.stringify(data.clientes[0].cliente));
      })
      .fail(function(jqxhr, settings, exception) {
        console.error('Client info: ' + exception );
      });
    }
  },

  // Call to get the form template from the server
  getFormTemplate: function(callback)
  {
    if (navigator.onLine) {
      
      var data = {
        cliente: app.loggedUser
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
          console.error('Form template: ' + exception );
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
      Helper.showAlert(LocaleManager.get('getFormError'));
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
          callback();
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

  sendPdfToServer: function(pdfData, extraEmails)
  {
    if (navigator.onLine) {

      // Document data
      var formData = new FormData();
      formData.append('pdf', pdfData);

      // Client email
      var clientInfo = StorageManager.get('navalClient', true);
      formData.append('emailEnvio', clientInfo.email_envio);
      formData.append('emailAcceso', clientInfo['email-acceso']);
      
      // Extra emails added by user
      if (!Helper.isEmpty(extraEmails)) {
        formData.append('extraEmails', extraEmails);
      }

      // Send it
      $.ajax({
        url        : this.sendPdfUrl,
        type       : 'POST',
        data       : formData,
        cache      : false,
        contentType: false,
        processData: false
      })
      .done(function(){
        Helper.showAlert(LocaleManager.get('docSent'), LocaleManager.get('notice'));
      })
      .error(function(e){
        Helper.showAlert(LocaleManager.get('docSentError'), LocaleManager.get('notice'));
        console.error('Send pdf to server:');
        console.error(e);
      });
      
    } else {
      Helper.showAlert(LocaleManager.get('docSentErrorNoConnection'), LocaleManager.get('notice'));
    }
  }
};
