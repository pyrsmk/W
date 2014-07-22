W 1.0.1
=======

W is a must needed tool for responsive designers. Knowing the current width/height of the viewport is necessary for us as well as catching window resize, zoom or text resize events. Moreover, we often need to deal with `em` units. Since browsers and devices could be quite different and there's no easy way to get all of that magic stuff : W is born.

Compatibility
-------------

- IE 6+
- Chrome
- Firefox 2+
- Opera 9+
- Safari 3+

Syntax
------

```javascript
// Get the current viewport width
W.getViewportWidth();
// Get the current viewport height
W.getViewportHeight();
// Convert pixels to ems (based on the current browser text size)
W.px2em(768);
// Add a listener to catch responsive events
W.addListener(function(){});
```

If needed, when you register a listener you can chain `W` to reuse that very same function :

```javascript
$(window).listen('scroll',W.addListener(function(){
    console.log("Hi! I'm the one who detects scroll and responsive events!");
}));
```

Caveats
-------

- zoom events won't change `em` unit in pixels; to be clear, `1em` will always equal to `16px` with zooms, the only way to have a change of this unit is by changing the global text size in the parameters of user's browser; that caveat just affect `px2em()`

With IE6-8, please consider waiting for DOM readiness before using W because of these issues (but it's not really important...) :

- IE6-7 will report a [zero offsetWidth](https://github.com/pyrsmk/W/issues/1), so W will fallbacks to a `16px` default value for `em` calculation (and it won't return a realistic `em` value when text size has been changed)
- IE8 could [throw an error telling that the parent element can't be modified while a child element is not closed](https://github.com/pyrsmk/W/issues/3)

License
-------

W is licensed under the [MIT license](http://dreamysource.mit-license.org).
