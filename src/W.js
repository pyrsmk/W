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
        boolean,number ems: if true return em-based width
                            if a number translate it in ems
    
    Return
        integer
*/
this.W=function(ems){
    var doc=document.documentElement,
        unit=1;
    // Calculate em unit
    if(ems){
        var element=document.createElement('div');
        element.style.width='10em';
        doc.appendChild(element);
        unit=element.offsetWidth/10;
        doc.removeChild(element);
        // Tranlate provided px-based width
        if(typeof ems=='number'){
            return ems/unit;
        }
    }
    // Guess window width
    if(typeof ems!='number'){
        var win=window,
            viewport_width=doc.offsetWidth,
            window_width=(typeof win.innerWidth)=='number'?win.innerWidth:doc.clientWidth;
        return ((window_width-viewport_width)*100/window_width<5?window_width:viewport_width)/unit;
    }
};