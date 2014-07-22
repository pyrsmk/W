/*
	Width management tool for responsive designs

	Author
		Aurélien Delogu (dev@dreamysource.fr)

	Some readings
		http://www.alistapart.com/articles/fontresizing/
		http://tripleodeon.com/2011/12/first-understand-your-screen/

	Notes
		Thanks to Lawrence Carvalho (carvalho@uk.yahoo-inc.com) for his useful TextResizeDetector script :)
*/

;(function(context,name,definition){
	if(typeof module!='undefined' && module.exports){
		module.exports=definition();
	}
	else if(typeof define=='function' && define.amd){
		define(definition);
	}
	else{
		context[name]=definition();
	}
}(this,'W',function(){

	// Prepare
	var win=window,
		doc=document,
		html=doc.documentElement,
		textElement,
		textHeight,
		listeners=[],
		trigger=false,
		unit,
		refreshUnit=function(){
			a=doc.createElement('div');
			a.style.width='1em';
			html.appendChild(a);
			unit=a.offsetWidth;
			console.log(unit);
			unit=unit?unit:16; // 16px as fallback
			html.removeChild(a);
		};
	refreshUnit();

	// Catch window resize event
	if(win.addEventListener){
		win.addEventListener('resize',function(){
			trigger=true;
		},false);
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

	// Define W object
	return {
		px2em: function(px){
			return px/unit;
		},
		getViewportWidth: function(){
			// Viewport width
			a=navigator.userAgent.match(/iPhone|iPod|iPad/i)?win.outerWidth:screen.width;
			// Window width
			if(!(b=win.innerWidth)){
				b=html.clientWidth;
			}
			// Guess the correct width
			return (b-a)*100/b<5?b:a;
		},
		getViewportHeight: function(){
			// Viewport height
			a=navigator.userAgent.match(/iPhone|iPod|iPad/i)?win.outerHeight:screen.height;
			// Window height
			if(!(b=win.innerHeight)){
				b=html.clientHeight;
			}
			// Guess the correct height
			return (b-a)*100/b<5?b:a;
		},
		addListener: function(func){
			listeners.push(func);
			return func;
		}
	};

}));