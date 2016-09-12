// Manages the language of the application
var LocaleManager = {

  defaultlang: 'es',
  lang       : 'es',
  locale     : {
    'es': {
      'notice'                  : 'Aviso',
      'error'                   : 'Error',
      'back'                    : 'Volver',
      'loading'                 : 'Cargando',
      'yes'                     : 'Sí',
      'no'                      : 'No',
      'cerrar'                  : 'Cerrar',
      // Login
      'user'                    : 'Usuario',
      'pass'                    : 'Contraseña',
      'login'                   : 'Login',
      // Home
      'init'                    : 'Inicio',
      'navNum'                  : 'Nº Navegación',
      'date'                    : 'Fecha',
      'captain'                 : 'Capitán',
      'boat'                    : 'Buque',
      'selectBoat'              : 'Seleccione buque',
      'initForm'                : 'Iniciar formulario',
      'contForm'                : 'Continuar formulario',
      'seeDocs'                 : 'Ver documentos generados',
      'logout'                  : 'Logout',
      // Docs
      'cancel'                  : 'Cancelar',
      'docsGenerated'           : 'Documentos Generados',
      'send'                    : 'Enviar',
      'sendTo'                  : 'Enviar a',
      'incorrectEmails'         : 'El correo no es válido',
      // Category
      'searchChecklist'         : 'Buscar checklist',
      // Checklist
      'delSignature'            : 'Borrar firma',
      'genPDF'                  : 'Generar PDF',
      'takePic'                 : 'Tomar foto',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'completeLogin'           : 'Complete usuario y contraseña',
      'completeAllFields'       : 'Complete todos los campos por favor',
      'userPassError'           : 'Usuario y/o contraseña incorrecto/s',
      'gettingForm'             : 'Obteniendo formulario',
      'getFormError'            : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'docDeleted'              : 'Archivo eliminado satisfactoriamente',
      'generatingFile'          : 'Generando archivo...',
      'generatingFileError'     : 'Error generando archivo',
      'docSent'                 : 'El documento fue enviado',
      'docSentError'            : 'No se pudo enviar el documento por correo',
      'docSentErrorNoConnection': 'No hay conexión a internet, no se envió el documento',
      'pleaseSign'              : 'Por favor, firma antes de generar el formulario',
      'noConnection'            : 'No hay conexión a internet',
      'confirmLogout'           : '¿Seguro que desea salir?',
      'confirmLogoutInProgress' : 'Hay un formulario en progreso, si sale lo perderá, ¿desea continuar?',
      'confirmNewForm'          : 'Hay un formulario en progreso, si inicia uno nuevo perderá el actual, ¿desea continuar?',
      'confirmSendDocument'     : '¿Seguro que desea enviar el documento?',
      'confirmDeleteDocument'   : '¿Seguro que desea eliminar el documento?',
      'confirmDeleteImg'        : '¿Seguro que desea eliminar la imagen?'
    },
    'en': {
      'notice'                  : 'Notice',
      'error'                   : 'Error',
      'back'                    : 'Back',
      'loading'                 : 'Loading',
      'yes'                     : 'Yes',
      'no'                      : 'No',
      'cerrar'                  : 'Close',
      // Login
      'user'                    : 'User',
      'pass'                    : 'Password',
      'login'                   : 'Login',
      // Home
      'init'                    : 'Home',
      'navNum'                  : 'Nº Navegación',
      'date'                    : 'Date',
      'captain'                 : 'Captain',
      'boat'                    : 'Boat',
      'selectBoat'              : 'Select boat',
      'initForm'                : 'New form',
      'contForm'                : 'Continue form',
      'seeDocs'                 : 'See generated documents',
      'logout'                  : 'Logout',
      // Docs
      'cancel'                  : 'Cancel',
      'docsGenerated'           : 'Generated Documents',
      'send'                    : 'Send',
      'sendTo'                  : 'Send to',
      'incorrectEmails'         : 'The email is not valid',
      // Category
      'searchChecklist'         : 'Search checklist',
      // Checklist
      'delSignature'            : 'Delete signature',
      'genPDF'                  : 'Generate PDF',
      'takePic'                 : 'Take picture',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'completeLogin'           : 'Complete usuario y contraseña',
      'completeAllFields'       : 'Complete todos los campos por favor',
      'userPassError'           : 'Usuario y/o contraseña incorrecto/s',
      'gettingForm'             : 'Obteniendo formulario',
      'getFormError'            : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'docDeleted'              : 'Archivo eliminado satisfactoriamente',
      'generatingFile'          : 'Generating file...',
      'generatingFileError'     : 'Error generating file',
      'docSent'                 : 'El documento fue enviado',
      'docSentError'            : 'No se pudo enviar el documento por correo',
      'docSentErrorNoConnection': 'No hay conexión a internet, no se envió el documento',
      'pleaseSign'              : 'Por favor, firma antes de generar el formulario',
      'noConnection'            : 'No hay conexión a internet',
      'confirmLogout'           : '¿Seguro que desea salir?',
      'confirmLogoutInProgress' : 'Hay un formulario en progreso, si sale lo perderá, ¿desea continuar?',
      'confirmNewForm'          : 'Hay un formulario en progreso, si inicia uno nuevo perderá el actual, ¿desea continuar?',
      'confirmSendDocument'     : '¿Seguro que desea enviar el documento?',
      'confirmDeleteDocument'   : '¿Seguro que desea eliminar el documento?',
      'confirmDeleteImg'        : '¿Seguro que desea eliminar la imagen?'
    }
  },

  get: function(key)
  {
    var text = this.locale[this.lang][key];
    if (Helper.isEmpty(text)) {

      // Fallback to default lang
      text = this.locale[this.defaultlang][key];
      if (Helper.isEmpty(text)) {
        text = key;
      }
    }

    return text;
  }
}