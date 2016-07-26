var BooleanField = {

  _template:
    '<div class="form_field form_field_boolean">' +
      '<p>{{question}}</p>' +
      '<input type="radio" name="bool_field_{{id}}" value="1" id="bool_field_{{id}}_1">' +
      '<label for="bool_field_{{id}}_1"> Sí</label>' +
      '<input type="radio" name="bool_field_{{id}}" value="0" id="bool_field_{{id}}_2">' +
      '<label for="bool_field_{{id}}_2"> No</label>' +
      '<br>' +
      '<textarea name="annotations" class="mt15" rows="6"></textarea>' +
      '<button id="take_picture_{{id}}">Tomar foto</button>' +
      '<div id="images_container_{{id}}" class="images_container">' +
        /*'<div class="image_element">' +
          '<span class="delete_image_icon" id="delete_image_1469525660071"></span>' +
          '<img src="file:///storage/emulated/0/Android/data/com.adobe.phonegap.app/cache/1469525660071.png" width="100" height="100">' +
        '</div>' +*/
      '</div>' +
    '</div>',

  _image:
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

  onPictureTakenOk: function(imgUri, id)
  {
    // Prepare the html template
    var imgName = imgUri.split('/').pop().split('.')[0];
    var template =  BooleanField._image.replace('{{name}}', imgName);
    template = template.replace('{{src}}', imgUri);

    console.log(imgUri);
    console.log('id: ' + id);
    console.log('name: ' + imgName);
    console.log(template);

    // Append the html
    $('#images_container_' + id).append(template);

    // Delete event
    $('#delete_image_' + imgName).on('click', function() {
      console.log('delete image');
      FileManager.deleteFile(
        imgUri,
        function() {
          $('#delete_image_' + imgName).parent().remove();
        });
    });
  },
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

    var template = this._template.replace('{{question}}', data.question);
    template = template.replace(/{{id}}/g, data.id);
    return template;
  }
};