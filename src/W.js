/*
    W, one width to rule them all

    Version     : 0.1.0
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/W
    License     : MIT
    
    Some readings
    
        http://www.quirksmode.org/mobile/viewports.html
        http://www.quirksmode.org/mobile/tableViewport.html
*/

/*
    Get viewport width
    
    Parameters
        boolean, number, Function spec: if true, return em-based width
                                        if a number, translate it in ems
                                        if a function, will be called when the window has been resized
    
    Return
        integer, null
*/
this.W=function(spec){
    // Catch resize event
    if(typeof spec=='function'){
        var addEventListener=window.addEventListener,
            attachEvent=window.attachEvent;
        if(addEventListener){
            addEventListener("resize",spec,false);
        }
        else if(attachEvent){
            attachEvent("onresize",spec);
        }
        // Force first call
        spec();
        return;
    }
    // Calculate em unit
    var doc=document.documentElement,
        unit=1;
    if(spec){
        var element=document.createElement('div');
        element.style.width='10em';
        doc.appendChild(element);
        unit=element.offsetWidth/10;
        doc.removeChild(element);
        // Tranlate provided px-based width
        if(typeof spec=='number'){
            return spec/unit;
        }
    }
    // Guess window width
    if(typeof spec!='number'){
        var win=window,
            viewport_width=doc.offsetWidth,
            window_width=(typeof win.innerWidth)=='number'?win.innerWidth:doc.clientWidth;
        return ((window_width-viewport_width)*100/window_width<5?window_width:viewport_width)/unit;
    }
};