describe('component', function(){
  var FontPickerComponent = window.FontPickerComponent;
  var el = $('body');

  /*
   * Test sync
   */
  describe('Add the component to the DOM', function(){
    it('Should be in the dom', function(){
      var c = new FontPickerComponent(['PT Sans'], {attachTo: el});
      expect(el.find(c.els.container).length).toEqual(1);
      c.remove();
    });

    it('Should have a picker list length of 3', function(){
      var c = new FontPickerComponent(['PT Sans', 'Expletus Sans', 'Racing Sans One'], {attachTo: el});

      expect(c.els.fontList.choices.length).toEqual(3);
      c.remove();
    });

    it('Should have a fontSize element if fontSize provided', function(){
      var c = new FontPickerComponent(['PT Sans'], {
        attachTo: el,
        fontSize: {
          min: 12,
          max: 30,
          step: 2,
          unit: 'pt'
        }
      });

      expect(c.els.fontSizer).toBeTruthy();
      c.remove();
    });
  })

  /*
   * Test async
   */ 
  describe('onChange should be fired when new fontSize is selected', function(){
    var callbackFired = false;
    var c;

    beforeEach(function(done) {
      c = new FontPickerComponent(['PT Sans'], {
        attachTo: el,
        fontSize: {
          min: 12,
          max: 30,
          step: 2,
          unit: 'pt'
        },
        events: {
          onChange: function(){
            console.log('called!');
            callbackFired = true;
          }
        }
      });

      c.els.fontSizer.chooser.click();
      c.els.fontSizer.choices[1].click();
      done();
    });

    it('Expect onChange callback to be fired when new font size is selected', function(done){
      expect(callbackFired).toEqual(true);
      c.remove();
      done();
    });
  });

  describe('onChange should be fired when new font is selected', function(){
    var callbackFired = false;
    var c;

    beforeEach(function(done) {
      c = new FontPickerComponent(['PT Sans', 'Expletus Sans'], {
        attachTo: el,
        events: {
          onChange: function(){
            callbackFired = true;
          }
        }
      });

      c.els.fontList.chooser.click();
      c.els.fontList.choices[1].click();
      done();
    });

    it('Expect onChange callback to be fired when new font size is selected', function(done){
      expect(callbackFired).toEqual(true);
      c.remove();
      done();    
    });
  });
});
