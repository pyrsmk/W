/*! W 1.5.2 (https://github.com/pyrsmk/W) */

// Prepare
var listeners = [],
	trigger = false,
	ua = navigator.userAgent.toLowerCase();

// Catch window resize event
if(window.addEventListener) {
	if('onorientationchange' in window) {
		window.addEventListener('orientationchange', function(){
			trigger = true;
		}, false);
	}
	else{
		window.addEventListener('resize', function(){
			trigger = true;
		}, false);
	}
}
else{
	window.attachEvent('onresize', function() {
		trigger = true;
	});
}

// Verify resizes every 10ms
setInterval(function() {
	if(trigger && document.documentElement.clientWidth) {
		trigger = false;
		for(var i=0, j=listeners.length; i<j; ++i) {
			listeners[i].func();
		}
	}
}, 10);

// Get screen orientation
function getOrientation() {
	var landscape;
	if('orientation' in window) {
		var orientation = window.orientation;
		if(/android/g.test(ua)) {
			landscape = (orientation == 0 || orientation == 180);
		}
		else {
			landscape = (orientation == 90 || orientation == -90);
		}
	}
	else {
		// Probably only used by desktop browsers
		var viewport = detectViewport();
		landscape = viewport.width > viewport.height;
	}
	return landscape ? 'landscape' : 'portrait';
}

// Viewport resolution detection
function detectViewport(absolute) {
	// Prepare
	var screen_width,
		screen_height,
		values = [
			{width: screen.availWidth, height: screen.availHeight},
			{width: window.outerWidth, height: window.outerHeight},
			{width: window.innerWidth, height: window.innerHeight}
		],
		i, j;
	// Detect right screen resolution from orientation
	// (calling getOrientation() here can make an infinite loop, but iOS supports window.orientation so it's fine)
	if(/(ipad|iphone|ipod)/g.test(ua) && getOrientation() == 'landscape') {
		screen_width = screen.height;
		screen_height = screen.width;
		// Override window.innerWidth (generally equals to 980)
		values[2].width = screen_width;
	}
	else{
		screen_width = screen.width;
		screen_height = screen.height;
	}
	// Absolute mode
	if(absolute) {
		return {
			width: screen_width,
			height: screen_height
		};
	}
	// Relative mode
	else {
		// Note found values
		for(i=0, j=values.length; i<j; ++i) {
			if(values[i].width > screen_width || values[i].height > screen_height || !values[i].width || !values[i].height) {
				values[i].note = 0;
			}
			else {
				values[i].note = (screen_width - values[i].width) + (screen_height - values[i].height);
			}
		}
		// Sort notes
		values.sort(function(a, b) {
			return b.note - a.note;
		});
		// Return the better values
		return {
			width: values[0].width,
			height: values[0].height
		};
	}
}

// Define W object
var W = {
	getViewportWidth: function(absolute) {
		return detectViewport(absolute).width;
	},
	getViewportHeight: function(absolute) {
		return detectViewport(absolute).height;
	},
	getOrientation: function() {
		return getOrientation();
	},
	addListener: function(func, key) {
		listeners.push({
			func: func,
			key: key
		});
		return func;
	},
	removeListener: function(key) {
		for(var i=0, j=listeners.length; i<j; ++i) {
			if(listeners[i].key == key) {
				listeners.splice(i, 1);
				break;
			}
		}
	},
	clearListeners: function() {
		listeners = [];
	},
	trigger: function(key) {
		for(var i=0, j=listeners.length; i<j; ++i) {
			if(typeof key == 'undefined' || listeners[i].key == key) {
				listeners[i].func();
			}
		}
	}
};
