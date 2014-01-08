W 0.3.0
=======

W is a must needed tool for responsive design developers. Knowing the current width of the viewport is necessary for us as well as catching window resize, zoom or text resize events. Moreover, we also need to deal with em units most of the time. Then, since browsers and devices could be quite different and there's no easy way to get all of that magic stuff: W is born.

Compatibility
-------------

- IE 6+
- Chrome
- Firefox 2+
- Opera 9+
- Safari 3+

Syntax
------

Quickly:

```javascript
// Get the viewport width in pxs
W();
// Get the viewport width in ems
W(true);
// Get the provided width in ems
W(768);
// Add a listener to catch window resize, zoom and text resize events
W(function(){});
```

And a concrete example:

```javascript
if(W(true)>=W(1440)){
    // some actions for wide screens or shrinked contents
}
// Catch events to update contents when needed
W(function(){
    // Refresh stylesheets to force contents adaptation (especially for zooming and text size changing)
    var links=document.getElementsByTagName('link'),
        i=-1,
        element;
    while(element=links[++i]){
        if(element.rel=='stylesheet'){
            element.disabled=true;
            element.disabled=false;
        }
    }
});
```

Notes
-----

The current relative width will be the viewport width on mobiles and the window width on desktops. With that way, you'll be able to adapt your design accross window sizes, screen sizes, zoom levels and text sizes.

This library is designed to be as small as possible to get the script fast loaded on mobiles, so there will never be ender integration or something like that.

With IE6-8, please consider waiting for readiness before using W because of these issues (but it's not really important...):

- IE6-7 will report a [zero offsetWidth](https://github.com/pyrsmk/W/issues/1), but, be quiet, W will fallbacks to a 16px default value for em calculation (then, W won't return a realistic em value when text size has been changed)
- IE8 could [throw an error telling that the parent element can't be modified while a child element is not closed](https://github.com/pyrsmk/W/issues/3)

License
-------

W is licensed under the MIT license.
