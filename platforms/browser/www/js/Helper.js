var Helper = {

  /**
  * Checks if an one-dimensional array contains certain value
  **/
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

  /**
  * Removes forbidden characters for a file name
  **/
  cleanFileName: function(fileName)
  {
    return fileName.replace(/[|&;:$%@"<>+,]/g, "");
  },

  escapeHtml: function(unsafe)
  {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
  * Returns a formatted date
  * @format 'a' yyyy-mm-dd 'b' dd/mm/yyyy
  * @dateString
  **/
  formatDate: function(format, dateString)
  {
    var format = format || 'a';
    var date;
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }

    if (format === 'a') {

      var formattedDate = 
        date.getFullYear() + '-' +
        this.pad(date.getMonth() + 1, 2) + '-' +
        this.pad(date.getDate(), 2);

    } else {
      
      var formattedDate = 
        this.pad(date.getDate(), 2) + '/' +
        this.pad(date.getMonth() + 1, 2) + '/' +
        date.getFullYear();
    }

    return formattedDate;
  },

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

  hideLoader: function ()
  {
    $('.overlay_modal').addClass('hidden');
  },

  isAndroid: function()
  {
    return this.getDeviceType() === 'Android';
  },

  isBrowser: function()
  {
    return this.getDeviceType() === 'Browser';
  },

  isIOs: function()
  {
    return (this.getDeviceType() === 'iPhone' || this.getDeviceType() === 'iPad');
  },

  isIphone: function()
  {
    return this.getDeviceType() === 'iPhone';
  },

  // Checks if a variable is empty
  isEmpty: function(data)
  {
    if (typeof data === 'number' || typeof data === 'boolean') {
      return false;
    }

    if (typeof(data) === 'undefined' || data === null) {
      return true;
    }

    if (typeof data.length !== 'undefined') {
      return data.length === 0;
    }

    var count = 0;
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        count++;
      }
    }

    return count === 0;
  },
  
  mobileDeviceStorageDirectory: function()
  {
    if (this.isIOs()) {
      return cordova.file.dataDirectory;
    } else {
      return cordova.file.externalRootDirectory;
    }
  },
 
  pad: function(str, max)
  {
    str = str.toString();
    return (str.length < max ? this.pad("0" + str, max) : str);
  },

  showAlert: function (message, title)
  {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, 'OK');
    } else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  showConfirm: function (message, confirmCallback, title)
  {
    if (navigator.notification) {
      navigator.notification.confirm(message, confirmCallback, title);
    } else {
      if (confirm(title ? (title + ": " + message) : message)){
        confirmCallback();
      }
    }
  },

  showLoader: function (message)
  {
    console.log('showLoader');
    message = message || 'Cargando';
    $('.overlay_modal').removeClass('hidden');
    $('#modal_message').html(message);
  },

  /**
  * Converts an image to base64
  **/
  toDataUrl: function(src, callback, outputFormat)
  {
    outputFormat = outputFormat || 'image/png';

    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  },

  validateEmail: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
};