// Does all the requests
var RequestManager = {
  _loadedScripts: [],
  
  // Call to get the form template from the server
  getFormTemplate: function(callback) {
    var data = {
      usuario: app.loggedUser
    };

    try {
      $.ajax({
        url : app.formTemplateUrl,
        data: data
      })
      .done(function(form) {
        FormParser.parseForm(form);
        FormManager.form = form;
        window.localStorage.setItem("navalForm", JSON.stringify(form));
        if (typeof callback !== 'undefined') {
          callback();
        }
      })
      .fail(function(jqxhr, settings, exception) {
        console.warn( "Fail: " + exception );
        Helper.showAlert('No se pudo obtener el formulario. Intente loguearse de nuevo por favor.');
      });
    } catch (e) {
      // try-catch to handle ERR_CONNECTION_REFUSED
      console.warn("Catch: " + exception );
      Helper.loadView('Error');
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
      url : app.loginUrl,
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
      url        : app.sendPdfUrl,
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
      console.log('[ERROR] Send pdf to server:');
      console.log(e);
    });
  }
};
