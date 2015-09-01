#FontPicker Component

A component for controlling font family and sizing. Takes an array of fonts which are Google Web Fonts, optional sizing options, and displays controls to each. Can be bound to an existing dom elelement, or binding can be done manually via callbacks.

#Transforms
FontPicker is built upon [SelectorList Component](https://github.com/calvinfroedge/selector-list-component), which allows transforms:

Example (turn container background color red on render):
```
{
  transforms: {
    fontList: {
      container: function(container){
        container.css('background-color', 'red');
      }
    }
  }
}
```

You can target both `fontList` and `fontSizer` via transforms. Check out the project page of [SelectorList Component](https://github.com/calvinfroedge/selector-list-component) for full documentation on transforms.

#Events
The following events can be provided via the events key in the configuration object (key -> (arguments)):

- onChange -> (fontChoice)

Font choice will appear as such:
```
{
  family: 'Lucida Grande',
  size: '14pt'
}
```

If you want to directly target the event that is triggered on change, you can add an event listener for `font:change`.
