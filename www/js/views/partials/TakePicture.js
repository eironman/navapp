var TakePicture = {

  _template:
    '<button id="take_picture_{{id}}">Tomar foto</button>' +
    '<div id="images_container_{{id}}" class="images_container">' +
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

  actions: function(id)
  {
    var self = this;

    // Take picture
    $('#take_picture_' + id).on('click', function() {
      navigator.camera.getPicture(
        function(imageUri) { self.onPictureTakenOk(imageUri, id); },
        self.onPictureTakenError,
        {
          quality           : 50,
          targetHeight      : 500,
          targetWidth       : 500,
          destinationType   : Camera.DestinationType.FILE_URI,
          sourceType        : Camera.PictureSourceType.CAMERA,
          encodingType      : Camera.EncodingType.PNG,
          mediaType         : Camera.MediaType.PICTURE,
          allowEdit         : true,
          correctOrientation: true  // Corrects Android orientation quirks
        }
      );
    });
  },

  // Callback when a picture has been taken
  onPictureTakenOk: function(imgUri, id)
  {
    // Prepare the html template
    var imgName = imgUri.split('/').pop().split('.')[0];
    var template =  TakePicture._picture.replace('{{name}}', imgName);
    template = template.replace('{{src}}', imgUri);

    // Append the image html
    $('#images_container_' + id).append(template);

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

  // Callback when an error happened taking a picture
  onPictureTakenError: function(e)
  {
    console.log(e);
  },

  render: function(data)
  {
    var self = this;
    $(".app").on('htmlContentLoaded', function() {
      self.actions(data.id);
    });

    var template = self._template.replace(/{{id}}/g, data.id);
    return template;
  }
};