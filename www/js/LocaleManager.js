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
      // Menu
      'myAccount'               : 'Mi cuenta',
      'seeDocs'                 : 'Documentos generados',
      'initForm'                : 'Iniciar formulario',
      // Login
      'user'                    : 'Usuario',
      'pass'                    : 'Contraseña',
      'login'                   : 'Login',
      'checkingUser'            : 'Comprobando usuario',
      'askPass'                 : '¿Contraseña?',
      // Home
      'init'                    : 'Inicio',
      'navNum'                  : 'Nº Viaje',
      'date'                    : 'Fecha',
      'captain'                 : 'Usuario y Cargo',
      'boat'                    : 'Buque',
      'selectBoat'              : 'Seleccione buque',
      'notAvailableForm'        : 'Formulario no disponible',
      'contForm'                : 'Continuar formulario',
      'logout'                  : 'Logout',
      // Docs
      'cancel'                  : 'Cancelar',
      'docsGenerated'           : 'Documentos Generados para ',
      'noBoatSelected'          : 'Por favor seleccione un buque',
      'send'                    : 'Enviar',
      'sendTo'                  : 'Enviar a',
      'incorrectEmail'          : 'El correo no es válido',
      'sendingDocument'         : 'Enviando documento',
      // Category
      'index'                   : 'Índice',
      'searchChecklist'         : 'Buscar checklist',
      // Checklist
      'delSignature'            : 'Borrar firma',
      'genPDF'                  : '¡He terminado! Generar y enviar',
      'takePic'                 : 'Tomar foto',
      'signHere'                : 'Firme aquí',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'completeLogin'           : 'Complete usuario y contraseña',
      'completeAllFields'       : 'Complete todos los campos por favor',
      'completeProfile'         : 'Complete su perfil por favor',
      'userPassError'           : 'Usuario y/o contraseña incorrecto/s',
      'noClientDataError'       : 'No se puede obtener la información de este usuario',
      'gettingForm'             : 'Obteniendo información, por favor espere...',
      'docDeleted'              : '¡El archivo se eliminó correctamente!',
      'generatingFile'          : 'Su archivo se está generando...',
      'generatingFileError'     : '¡Ups! Error generando archivo',
      'onlyOneEmail'            : '¿Dónde enviamos una copia?',
      'docSent'                 : '¡Bien hecho! El documento se generó y envió satisfactoriamente',
      'docSentError'            : '¡Ups! No se pudo enviar el documento por correo',
      'docSentErrorNoConnection': 'No hay conexión a internet, no se envió el documento',
      'pleaseSign'              : '¡Hey¡ Antes debes firmar el documento',
      'noConnection'            : 'No hay conexión a internet',
      'confirmLogout'           : '¿Seguro que desea salir?',
      'confirmLogoutInProgress' : 'Hay un formulario en progreso, si sale lo perderá, ¿desea continuar?',
      'confirmNewForm'          : 'Hay un formulario en progreso, si inicia uno nuevo perderá el actual, ¿desea continuar?',
      'confirmDeleteDocument'   : '¿Seguro que desea eliminar el documento?',
      'confirmDeleteImg'        : '¿Seguro que desea eliminar la imagen?',
      'howToGetPass'            : 'Hable con su superior para que le de su clave de acceso a Nautons'
    },
    'en': {
      'notice'                  : 'Notice',
      'error'                   : 'Error',
      'back'                    : 'Back',
      'loading'                 : 'Loading',
      'yes'                     : 'Yes',
      'no'                      : 'No',
      'cerrar'                  : 'Close',
      // Menu
      'myAccount'               : 'My account',
      'seeDocs'                 : 'Generated documents',
      'initForm'                : 'New form',
      // Login
      'user'                    : 'User',
      'pass'                    : 'Password',
      'login'                   : 'Login',
      'checkingUser'            : 'Checking user',
      'askPass'                 : 'Password?',
      // Home
      'init'                    : 'Home',
      'navNum'                  : 'Trip Number',
      'date'                    : 'Date',
      'captain'                 : 'User and Position',
      'boat'                    : 'Boat',
      'selectBoat'              : 'Select boat',
      'notAvailableForm'        : 'Form is not available',
      'contForm'                : 'Continue form',
      'logout'                  : 'Logout',
      // Docs
      'cancel'                  : 'Cancel',
      'docsGenerated'           : 'Generated Documents for ',
      'noBoatSelected'          : 'Please select a boat',
      'send'                    : 'Send',
      'sendTo'                  : 'Send to',
      'incorrectEmail'          : 'The email is not valid',
      'sendingDocument'         : 'Sending document',
      // Category
      'index'                   : 'Index',
      'searchChecklist'         : 'Search checklist',
      // Checklist
      'delSignature'            : 'Delete signature',
      'genPDF'                  : 'I\'m done! Generate & Send!',
      'takePic'                 : 'Take picture',
      'signHere'                : 'Sign here',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'The form could not be retrieved. Try login again please.',
      'completeLogin'           : 'Complete user and password',
      'completeAllFields'       : 'Complete all fields please',
      'completeProfile'         : 'Complete your profile please',
      'userPassError'           : 'User and/or password incorrect',
      'noClientDataError'       : 'Cannot retrieve user info',
      'gettingForm'             : 'Getting form',
      'docDeleted'              : 'File deleted successfully',
      'generatingFile'          : 'Generating file...',
      'generatingFileError'     : 'Error generating file',
      'onlyOneEmail'            : 'Only one email address',
      'docSent'                 : 'The document was sent',
      'docSentError'            : 'The document could not be sent by email',
      'docSentErrorNoConnection': 'No internet connection, the document was not sent',
      'pleaseSign'              : 'Please, sign before generating the document',
      'noConnection'            : 'No internet connection',
      'confirmLogout'           : 'Are you sure you want to logout?',
      'confirmLogoutInProgress' : 'There is a form in progress, you will lose it, are you sure?',
      'confirmNewForm'          : 'There is a form in progress, starting a new one will delete it, are you sure?',
      'confirmDeleteDocument'   : 'Are you sure you want to delete the document?',
      'confirmDeleteImg'        : 'Are you sure you want to delete the image?',
      'howToGetPass'            : 'Please ask for the login details to you main office'
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
  },

  setLang: function(lang) {
    this.lang = lang;
  }
}