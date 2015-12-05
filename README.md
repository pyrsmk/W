W 1.3.9
=======

CSS media queries are a powerful tool to deal with responsive designs : the browser handles design updates by itself. Unfortunately, in the javascript environment it's not the same. Browsers return different values for their viewport and no simple events exist to know when the user has resized his window or zoomed your site's contents. Moreover, media queries computing is based on the screen resolution and not the inner size of the window : design and content should rely to the window to keep consistent, not the screen (per example, on iOS8, on an iPad2, returns `768x1024` in portrait and lanscape).

W aims to solve these problems.

Install
-------

You can pick the minified library or install it with :

```
npm install pyrsmk-w
bower install pyrsmk-w
jam install pyrsmk-w
```

Syntax
------

Please always load W at the end of your HTML page or when the DOM is ready. Here's the API :

```js
// Get the orientation of the device (return 'portrait' or 'landscape')
W.getOrientation();
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

```js
$(window).listen('scroll',W.addListener(function(){
    console.log("Hi! I'm the one who detects scroll and responsive events!");
}));
```

If needed you can retrieve viewport's width/height in absolute mode (eg. screen resolution) to unify JS and CSS behaviors, per example :

```js
W.getViewportWidth(true);
W.getViewportHeight(true);
```

You can remove a listener by passing an optional key to the `addListener()` method :

```js
W.addListener(function(){}, 'mylistener');
W.removeListener('mylistener');
```

Caveats
-------

- under iOS5 (and maybe 6), W will always return `portrait` as device orientation; the values that iOS return are really weird and I found no way to guess the orientation
- zoom events won't change `em` unit in pixels; to be clear, `1em` will always equal to `16px` with zooms, the only way to have a change of this unit is by changing the global text size in the parameters of user's browser; that caveat just affect `px2em()`

License
-------

W is licensed under the [MIT license](http://dreamysource.mit-license.org).
