/*
 * Component
 *
 * Options:
 * {
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define(['jquery', 'selector-list-component', 'webfontloader'], function ($, SelectorList, WebFont) { 
          return module.component($, SelectorList, WebFont); 
        });
    } else {
        window.FontPickerComponent = module.component($, window.SelectorListComponent, window.WebFont);
    }
}({
  component: function($, SelectorListComponent, WebFont){
    /*
     * Load fonts
     */
    var loadFonts = function(fonts, done){
      WebFont.load({
        google: {
          families: fonts 
        },
        active: done
      });
    }

    /*
     * Creates component and adds to page
     */
    var FontPickerComponent = function(fonts, opts){
      if(!$.isArray(fonts)) throw new Error("Fonts must be provided as an array!");

      var opts = opts || {};

      opts.events = opts.events || {};

      opts.transforms = opts.transforms || {};

      var font = {
        family: opts.fontDefault || fonts[0]
      };

      /*
       * Keep track of component's elements
       */
      var els = {};

      /*
       * Create font list using SelectorList
       */
      var createFontList = function(fonts){
        return new SelectorListComponent(fonts,
          {
            events: $.extend({
              "itemSelected": function(li, choice, chooser){
                chooser.css('font-family', choice);
                font.family = choice;
                if(opts.events.onChange) els.container.trigger('font:change', font);
              }
            }, (opts.events.fontList || {})),
            transforms: $.extend({
              container: function(x){
                x.css('font-family', fonts[0]);
              },
              listItem: function(li, font){
                li.css('font-family', font);
              }
            }, (opts.transforms.fontList || {})),
            selected: font.family
          }    
        );
      }

      if(opts.fontSize){
        font.size = opts.fontSize.default || (opts.fontSize.min + opts.fontSize.unit);
      }

      /*
       * Font size list
       *
       * min: Where to start the list
       * max: Where to end the list
       * step: The number of integers to skip between items
       * unit: px, em, pt, etc.
       */
      var createFontSizeList = function(min, max, step, unit){
        var list = [];
        for(var i=min;i<max;i+=step){
          list.push(i+unit);
        }

        return new SelectorListComponent(list,
          {
            events: $.extend({
              "itemSelected": function(li, choice, chooser){
                chooser.css('font-size', choice);
                font.size = choice;
                if(opts.events.onChange) els.container.trigger('font:change', font);
              }
            }, (opts.events.fontSize || {})),
            transforms: $.extend({
              listItem: function(li, size){
                li.css('font-size', size);
              }
            }, (opts.transforms.fontList || {}))
          }
        )
      }

      els.container = $('<div class="font-picker-component">');

      els.fontList = createFontList(fonts).els;

      els.container.append(els.fontList.container);

      if(opts.fontSize){
        els.fontSizer = createFontSizeList(opts.fontSize.min, opts.fontSize.max, opts.fontSize.step, opts.fontSize.unit).els;

        els.container.append(els.fontSizer.container);
      }

      /*
       * Bind font to UI managed element
       */
      var doBind = function(){
        if(opts.bindTo){
          opts.bindTo.css('font-family', font.family);
          opts.bindTo.css('font-size', font.size);
        }
      }

      /*
       * Change event from user
       */
      els.container.on('font:change', function(event, font){
        if(opts.events.onChange){
          opts.events.onChange(font);
          doBind();
        }
      });

      /*
       * Bind changes, set default, if node to be bound is provided
       */
      if(opts.bindTo){
        doBind();
        els.container.trigger('font:change', font);
      }

      /*
       * attach parent node to dom
       */
      if(opts.attachTo){
        if(opts.attachTo instanceof $){
          opts.attachTo.append(els.container);
        } else {
          opts.attachTo.appendChild(els.container);
        }

        if(opts.events.onRender){
          opts.events.onRender(els.container);
        }
      }

      /*
       * We don't wait for this because sometimes it can take a while
       */
      loadFonts(fonts, function(){
        if(opts.events.onFontsLoaded) opts.events.onFontsLoaded();
      });

      //Public API for the component
      return {
        els: els,
        remove: function(){ //Remove container & event listeners
          els.container.remove();
        }
      }
    };

    return FontPickerComponent;

  }
}));
