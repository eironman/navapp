var LoadingView = {

  _template:
    '<div id="loading_view" class="center_screen">' +
      '<p>Cargando</p>' +
      '<br/><img src="img/loader.gif" />' +
    '</div>',

  render: function() {
    console.log('render loading');
    $(".app").html(this._template);
  }
};