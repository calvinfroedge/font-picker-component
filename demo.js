requirejs.config({
  paths: {
    "jquery": "bower_components/jquery/dist/jquery.min",
    "selector-list-component": "bower_components/selector-list-component/main",
    "webfontloader": "bower_components/webfontloader/webfontloader"
  }
});

define(["main"], function(FontPickerComponent) {
  new FontPickerComponent(
    ['PT Sans', 'Open Sans', 'Josefin Slab', 'Droid Sans'],
    {
      attachTo: $('#container'),
      fontSize: {
        min: 12,
        max: 30,
        step: 2,
        unit: 'pt'
      },
      events: {
        onChange: function(){
          console.log('I changed!');
        }
      },
      bindTo: $('.bindme')
    }
  );
});
