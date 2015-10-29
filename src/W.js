/*! W 1.3.4 (https://github.com/pyrsmk/W) */

// Prepare
var html = document.documentElement,
	a, b,
	textElement,
	textWidth,
	listeners = [],
	trigger = false,
	unit = 16;

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

// Initialize the text element to catch text resizes
textElement = document.createElement('p');
textElement.style.position = 'absolute';
textElement.style.textIndent = '100%';
textElement.style.whiteSpace = 'nowrap';
textElement.style.overflow = 'hidden';
textElement.style.color = 'transparent';
textElement.innerHTML = 'W';
html.appendChild(textElement);
textWidth = textElement.offsetWidth;

// Verify resizes every 10ms
setInterval(function() {
	// Verify text element state
	a = textElement.offsetWidth;
	if(a != textWidth){
		trigger = true;
	}
	// Text has been resized
	if(trigger && html.clientWidth) {
		unit = textWidth / a * unit;
		textWidth = a;
		for(var i=0, j=listeners.length; i<j; ++i) {
			listeners[i].func();
		}
		trigger = false;
	}
}, 10);

// Get screen orientation
function getOrientation() {
	if('orientation' in window) {
		return !window.orientation ? 'portrait' : 'landscape';
	}
	else{
		return html.clientWidth > html.clientHeight ? 'landscape' : 'portrait';
	}
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
	if(/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && getOrientation() == 'landscape') {
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

// Return W object
return {
	px2em: function(px) {
		return px / unit;
	},
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
	}
};
