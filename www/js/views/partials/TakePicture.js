var TakePicture = {

  _template:
    '<button id="take_picture_{{questionId}}">Tomar foto</button>' +
    '<div id="images_container_{{questionId}}" class="images_container">' +
      /*'<div class="image_element">' +
        '<span class="delete_image_icon" id="delete_image_1469525660071"></span>' +
        '<img src="file:///storage/emulated/0/Android/data/com.adobe.phonegap.app/cache/1469525660071.png" width="100" height="100">' +
      '</div>' +*/
    '</div>',

  _picture:
    '<div class="image_element">' +
      '<span class="delete_image_icon" id="delete_image_{{name}}"></span>' +
      '<img src="{{src}}" width="100" height="100">' +
    '</div>',

  actions: function(questionId)
  {
    // Clear previous event
    $('#take_picture_' + questionId).off('click');

    // Take picture
    var self = this;
    $('#take_picture_' + questionId).on('click', function() {
      navigator.camera.getPicture(
        function(imageUri) {
          self.storePicture(imageUri, questionId);
          self.attachPicture(imageUri, questionId);
        },
        self.onPictureTakenError,
        {
          quality           : 50,
          targetHeight      : 250,
          targetWidth       : 250,
          destinationType   : Camera.DestinationType.FILE_URI,
          sourceType        : Camera.PictureSourceType.CAMERA,
          encodingType      : Camera.EncodingType.JPG,
          mediaType         : Camera.MediaType.PICTURE,
          allowEdit         : true,
          correctOrientation: true  // Corrects Android orientation quirks
        }
      );
    });
  },

  // Adds the picture thumbnail
  attachPicture: function(imgUri, questionId)
  {
    // Prepare the html template
    var imgName = imgUri.split('/').pop().split('.')[0];
    var template =  TakePicture._picture.replace('{{name}}', imgName);
    template = template.replace('{{src}}', imgUri);

    // Append the image html
    $('#images_container_' + questionId).append(template);

    // Delete picture event
    $('#delete_image_' + imgName).on('click', function() {
      Helper.showConfirm(
        '¿Seguro que desea eliminar la imagen?',
        function(buttonPressed) {
          if (typeof buttonPressed === 'undefined' || buttonPressed === 1) {
            FileManager.deleteFile(
              imgUri,
              function() {
                $('#delete_image_' + imgName).parent().remove();
              }
            );
          }
        }
      );
    });
  },

  // Loads images stored in local storage
  loadStoredValue: function(questionId, storedValue)
  {
    if (storedValue) {
      for (var i = 0; i < storedValue.images.length; i++) {
        this.attachPicture(storedValue.images[i], questionId);
      }
    }
  },

  // Stores image in local storage
  storePicture: function(imgUri, questionId)
  {
    var questionType = QuestionManager.getQuestionType(questionId);
    if (questionType === QuestionManager.TYPE_BOOLEAN) {
      QuestionManager.storeBoolean(questionId, null, null, imgUri);
    } else {
      QuestionManager.storeText(questionId, null, imgUri);
    }
  },
  
  // Callback when an error happened taking a picture
  onPictureTakenError: function(e)
  {
    console.log(e);
  },

  render: function(data, storedValue)
  {
    var self = this;
    $(".app").on('htmlContentLoaded', function() {
      self.actions(data.id);
      self.loadStoredValue(data.id, storedValue);
    });

    var template = self._template.replace(/{{questionId}}/g, data.id);
    return template;
  }
};