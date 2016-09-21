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
      'navNum'                  : 'Nº Navegación',
      'date'                    : 'Fecha',
      'captain'                 : 'Capitán',
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
      // Category
      'index'                   : 'Índice',
      'searchChecklist'         : 'Buscar checklist',
      // Checklist
      'delSignature'            : 'Borrar firma',
      'genPDF'                  : 'Generar PDF',
      'takePic'                 : 'Tomar foto',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'No se pudo obtener el formulario. Intente loguearse de nuevo por favor.',
      'completeLogin'           : 'Complete usuario y contraseña',
      'completeAllFields'       : 'Complete todos los campos por favor',
      'completeProfile'         : 'Complete su perfil por favor',
      'userPassError'           : 'Usuario y/o contraseña incorrecto/s',
      'gettingForm'             : 'Obteniendo formulario',
      'docDeleted'              : 'Archivo eliminado satisfactoriamente',
      'generatingFile'          : 'Generando archivo...',
      'generatingFileError'     : 'Error generando archivo',
      'onlyOneEmail'            : 'Una única dirección de correo',
      'docSent'                 : 'El documento fue enviado',
      'docSentError'            : 'No se pudo enviar el documento por correo',
      'docSentErrorNoConnection': 'No hay conexión a internet, no se envió el documento',
      'pleaseSign'              : 'Por favor, firma antes de generar el formulario',
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
      'navNum'                  : 'Navigation Number',
      'date'                    : 'Date',
      'captain'                 : 'Captain',
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
      // Category
      'index'                   : 'Index',
      'searchChecklist'         : 'Search checklist',
      // Checklist
      'delSignature'            : 'Delete signature',
      'genPDF'                  : 'Generate PDF',
      'takePic'                 : 'Take picture',
      // Alerts, notices and confirms
      'errorGettingForm'        : 'The form could not be retrieved. Try login again please.',
      'completeLogin'           : 'Complete user and password',
      'completeAllFields'       : 'Complete all fields please',
      'completeProfile'         : 'Complete your profile please',
      'userPassError'           : 'User and/or password incorrect',
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