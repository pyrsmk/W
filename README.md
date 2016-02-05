W 1.5.1
=======

CSS media queries are a powerful tool to deal with responsive designs : the browser handles design updates by itself. Unfortunately, in the javascript environment it's not the same. Browsers return different values for their viewport and no simple events exist to know when the user has resized his window or zoomed your site's contents. Moreover, media queries computing is based on the screen resolution and not the inner size of the window : design and contents should rely on the window to keep consistent, not on the screen (per example, on iOS8, an iPad2 returns `768x1024` in portrait AND lanscape mode).

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

```js
// Get the orientation of the device (return 'portrait' or 'landscape')
W.getOrientation();
// Get the current viewport width
W.getViewportWidth();
// Get the current viewport height
W.getViewportHeight();
// Add a listener to catch responsive events (key is optional)
W.addListener(function(){}, 'key');
// Remove a listener
W.removeListener('key');
// Clear all listeners
W.clearListeners();
```

For ease of use, when you register a listener W returns it, so you can reuse that very same callback :

```js
$(window).listen('scroll', W.addListener(function() {
    console.log("Hi! I'm the one who detects scroll and responsive events!");
}));
```

You can retrieve viewport's width/height in absolute mode (eg. screen resolution) to unify JS and CSS behaviors :

```js
W.getViewportWidth(true);
W.getViewportHeight(true);
```

If needed, you can trigger your listeners on demand :

```js
// Trigger all listeners
W.trigger();
// Trigger the 'key' listener
W.trigger('key');
```

You can also manually trigger a listener once, since the callback is returned by W :

```js
W.addListener(function(){
	// Blah blah
})();
```

Caveats
-------

- under iOS5 (and maybe 6), W will always return `portrait` as device orientation; the values that iOS return are really weird and I found no way to guess the orientation
- zoom events won't change `em` unit in pixels; to be clear, `1em` will always equal to `16px` with zooms, the only way to have a change of this unit is by changing the global text size in the parameters of user's browser; that caveat just affect `px2em()`

License
-------

W is licensed under the [MIT license](http://dreamysource.mit-license.org).
