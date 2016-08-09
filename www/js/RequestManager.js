// Does all the requests
var RequestManager = {
  _loadedScripts : [],
  clientDataUrl  : "http://www.dereksolutions.com/navapp/jsonclientes",
  formTemplateUrl: "http://www.dereksolutions.com/navapp/jsonpreguntas",
  loginUrl       : "http://www.dereksolutions.com/navapp/loginapp",
  sendPdfUrl     : "http://www.in.mallorcaparquet.com/pdf.php",
  
  // Call to get the client info to write in the pdf
  getClientInfo: function()
  {
    var data = {
      cliente: app.loggedUser
    };

    $.ajax({
      url : this.clientDataUrl,
      data: data
    })
    .done(function(client) {
      StorageManager.set('navalClient', JSON.stringify(client.clientes[0].cliente));
    })
    .fail(function(jqxhr, settings, exception) {
      console.error( "Client info: " + exception );
    });
  },

  // Call to get the form template from the server
  getFormTemplate: function(callback)
  {
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
        StorageManager.set("navalForm", JSON.stringify(form));
        DataParser.parseForm(form);
        callback();
      })
      .fail(function(jqxhr, settings, exception) {
        console.error( "Form template: " + exception );
        RequestManager.getFormFallback();
        callback();
      });
    } catch (e) {
      // try-catch to handle ERR_CONNECTION_REFUSED
      console.warn("Catch: " + exception );
      RequestManager.getFormFallback();
      callback();
    }
  },

  // If getting the form template from server didn't work, use the form in local storage
  getFormFallback: function()
  {
    if (FormManager.form !== null) {
      console.warn('[WARN] Using form from local storage');
      DataParser.parseForm(FormManager.form);
    } else {
      console.warn('[WARN] There is no form in local storage');
      Helper.showAlert('No se pudo obtener el formulario. Intente loguearse de nuevo por favor.');
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
    $.ajax({
      type: 'POST',
      url : this.loginUrl,
      data: { 
        name: user,
        pass: pass      }
    })
    .done(function(result) {
      if (result === 'OK') {
        callback();
      } else {
        Helper.showAlert('Usuario y/o contraseña incorrecto/s', 'Error');
      }
    })
    .fail(function(jqxhr, settings, exception) {
      console.warn( "Something went wrong " + exception );
    });
  },

  sendPdfToServer: function(pdfData)
  {
    pdfData = pdfData || this.pdfOutput;
    
    // Document data
    var formData = new FormData();
    formData.append('pdf', pdfData);
    
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
      Helper.showAlert('El documento fue enviado.', 'Aviso');
    })
    .error(function(e){
      Helper.showAlert('No se pudo enviar el documento por correo.', 'Error');
      console.error('Send pdf to server:');
      console.error(e);
    });
  }
};
