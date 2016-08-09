// Manages the language of the application
var LocaleManager = {

  defaultlang: 'es',
  lang       : 'es',

  locale: {
    'es': {
      'user': 'Usuario',
      'pass': 'Contraseña',
      'login': 'Login'
    },
    'en': {
      'user': 'User',
      'pass': 'Password'
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