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

(function(context,name,definition){
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
		eventFunc=function(func){
			return function(){
				if(html.clientWidth){
					func();
				}
			};
		},

	/*
		Main function

		Parameters
			Boolean, Number, Function spec: if true, return em-based window width
											if a number, translate it to ems
											if a function, will be called when the user resizes the window, zooms the contents or changes text size

		Return
			Integer, null
	*/
	W=function(spec){
		var type=typeof spec,
			unit,
			a,b;
		if(type=='function'){
			// Catch window resize event
			if(a=win.addEventListener){
				a('resize',eventFunc(spec),false);
			}
			else{
				win.attachEvent('onresize',eventFunc(spec));
			}
			// Catch text resize event
			if(!listeners.length){
				textElement=doc.createElement('b');
				textElement.style.position='absolute';
				textElement.style.top='-99em';
				textElement.innerHTML='W';
				html.appendChild(textElement);
				textHeight=textElement.offsetHeight;
				setInterval(function(a,i,j){
					// Trigger text resize event
					a=textElement.offsetHeight;
					if(textHeight!=a){
						for(i=0,j=listeners.length;i<j;++i){
							eventFunc(listeners[i])();
						}
					}
					textHeight=a;
				},250);
			}
			listeners.push(spec);
			return W;
		}
		// Compute em unit
		a=doc.createElement('div');
		a.style.width='1em';
		html.appendChild(a);
		unit=a.offsetWidth;
		unit=unit?unit:16; // 16px as fallback
		html.removeChild(a);
		// Tranlate provided px-based width
		if(type=='number'){
			return spec/unit;
		}
		else{
			// Viewport width
			a=navigator.userAgent.match(/iPhone|iPod|iPad/i)?win.outerWidth:screen.width;
			// Window width
			if(!(b=win.innerWidth)){
				b=html.clientWidth;
			}
			// Guess the correct "window" width
			a=(b-a)*100/b<5?b:a;
			return spec?a/unit:a;
		}
	};

	return W;

}));
