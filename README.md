W 1.6.0
=======

In responsive development with javascript, we often need to know the correct viewport size, without caring of the environment or the media orientation. Desktop browsers return correct values but mobiles are a big mess.

Moreover, we need to know when the text has been resized or the media orientation has changed, so we can adapt our layout accordingly.

W aims to solve this for you.

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
// Get viewport dimensions; returns {width: integer, height: integer}
W.getViewportDimensions();
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

License
-------

W is licensed under the [MIT license](http://dreamysource.mit-license.org).
