/*! W 1.2.3 (https://github.com/pyrsmk/W) */

;(function(context,name,definition){
	if(typeof module!='undefined' && module.exports){
		module.exports=definition;
	}
	else if(typeof define=='function' && define.amd){
		define(definition);
	}
	else{
		context[name]=definition;
	}
}(this,'W',function(){

	// Prepare
	var win=window,
		doc=document,
		html=doc.documentElement,
		a,b,
		textElement,
		textHeight,
		listeners=[],
		trigger=false,
		unit,
		absolute_mode=false,
		refreshUnit=function(){
			a=doc.createElement('div');
			a.style.width='1em';
			html.appendChild(a);
			unit=a.offsetWidth;
			unit=unit?unit:16;
			html.removeChild(a);
		},
		getOrientation=function(){
			if('orientation' in window){
				return !window.orientation?'portrait':'landscape';
			}
			else{
				return html.clientWidth>html.clientHeight?'landscape':'portrait';
			}
		};
	refreshUnit();

	// Catch window resize event
	if(win.addEventListener){
		if('onorientationchange' in win){
			win.addEventListener('orientationchange',function(){
				trigger=true;
			},false);
		}
		else{
			win.addEventListener('resize',function(){
				trigger=true;
			},false);
		}
	}
	else{
		win.attachEvent('onresize',function(){
			trigger=true;
		});
	}

	// Initialize the text element to catch text resizes
	textElement=doc.createElement('b');
	textElement.style.position='absolute';
	textElement.style.top='-99em';
	textElement.innerHTML='W';
	html.appendChild(textElement);
	textHeight=textElement.offsetHeight;

	// Verify resizes every 250ms
	setInterval(function(){
		// Verify text element state
		a=textElement.offsetHeight;
		if(a!=textHeight){
			trigger=true;
		}
		textHeight=a;
		// Text has been resized
		if(trigger && html.clientWidth){
			refreshUnit();
			for(var i=0,j=listeners.length;i<j;++i){
				listeners[i]();
			}
			trigger=false;
		}
	},250);

	// Viewport resolution detection
	function detectViewport(){
		// Prepare
		var screen_width,
			screen_height,
			values=[
				{width:screen.availWidth,height:screen.availHeight},
				{width:window.outerWidth,height:window.outerHeight},
				{width:window.innerWidth,height:window.innerHeight}
			],
			notes=[],
			i,j;
		// Detect right screen resolution from orientation
		if(/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && getOrientation()=='landscape'){
			screen_width=screen.height;
			screen_height=screen.width;
			// Override window.innerWidth (generally equals to 980)
			values[2].width=screen_width;
		}
		else{
			screen_width=screen.width;
			screen_height=screen.height;
		}
		// Absolute mode
		if(absolute_mode){
			return {
				width: screen_width,
				height: screen_height
			};
		}
		// Relative mode
		else{
			// Apply rules
			for(i=0,j=values.length;i<j;++i){
				if(values[i].width>screen_width || values[i].height>screen_height || !values[i].width || !values[i].height){
					values[i].note=0;
				}
				else{
					values[i].note=(screen_width-values[i].width)+(screen_height-values[i].height);
				}
			}
			// Sort notes
			values.sort(function(a,b){
				return b.note-a.note;
			});
			// Return the better value
			return {
				width: values[0].width,
				height: values[0].height
			};
		}
	}

	// Define W object
	return {
		px2em: function(px){
			return px/unit;
		},
		getViewportWidth: function(){
			return detectViewport().width;
		},
		getViewportHeight: function(){
			return detectViewport().height;
		},
		addListener: function(func){
			listeners.push(func);
			return func;
		},
		setAbsoluteMode: function(flag){
			absolute_mode=!!flag;
		},
		getOrientation: function(){
			return getOrientation();
		}
	};

}()));