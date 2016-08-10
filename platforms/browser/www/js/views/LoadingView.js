var LoadingView = {

  _template:
    '<div id="loading_view" class="center_screen">' +
      '<p>--loading--</p>' +
      '<br/><img src="img/loader.gif" />' +
    '</div>',

  render: function() {
    app.loadHtmlContent(template);
  }
};