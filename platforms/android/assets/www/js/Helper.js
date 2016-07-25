var Helper = {
  _loadedScripts: [],
  getDeviceType: function()
  {
    if (navigator.userAgent.match(/iPad/i)) {
      return 'iPad';
    }  else if (navigator.userAgent.match(/iPhone/i)) {
      return 'iPhone';
    } else if (navigator.userAgent.match(/Android/i)) {
      return 'Android';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      return 'BlackBerry';
    } else {
      return 'Browser';
    }
  },

  isAndroid: function()
  {
    return this.getDeviceType() === 'Android';
  },

  isIphone: function()
  {
    return this.getDeviceType() === 'iPhone';
  },

  isIOs: function()
  {
    return (this.getDeviceType() === 'iPhone' || this.getDeviceType() === 'iPad');
  },

  isBrowser: function()
  {
    return this.getDeviceType() === 'Browser';
  },

  mobileDeviceStorageDirectory: function()
  {
    if (this.isIOs()) {
      return cordova.file.dataDirectory;
    } else {
      return cordova.file.externalRootDirectory;
    }
  },
  
  arrayContains: function(a, item)
  {
    var array = a || [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item) {
        return true;
      }
    }

    return false;
  },

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

  loadView: function(viewName, data)
  {
    this.includeScript('views/' + viewName +'View');
    if (typeof data === 'undefined') {
      eval(viewName +'View.render()');
    } else {
      eval(viewName +'View.render(data)');
    }
  },
  
  showAlert: function (message, title)
  {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, 'OK');
    } else {
      alert(title ? (title + ": " + message) : message);
    }
  },
};