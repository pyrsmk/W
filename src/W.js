/*
    W, width management tool for responsive designs

    Version     : 0.1.3
    Authors     : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/W
    License     : MIT
    
    Some readings
    
        http://www.quirksmode.org/mobile/viewports.html
        http://www.quirksmode.org/mobile/tableViewport.html
        http://www.alistapart.com/articles/fontresizing/
    
    Thanks
    
        To Lawrence Carvalho (carvalho@uk.yahoo-inc.com) for his useful TextResizeDetector script :)
*/

/*
    Main function
    
    Parameters
        boolean, number, Function spec: if true, return em-based window width
                                        if a number, translate it to ems
                                        if a function, will be called when the user resizes the window, zooms the contents or changes text size
    
    Return
        integer, null
*/
this.W=function(spec){
    var win=window,
        doc=document,
        html=doc.documentElement,
        textelement,
        textheight,
        style='style',
        listeners=[],
        a,b;
    if(typeof spec=='function'){
        // Catch window resize event
        if(a=win.addEventListener){
            a('resize',spec,false);
        }
        else{
            win.attachEvent('onresize',spec);
        }
        // Catch text resize event
        if(!listeners.length){
            textelement=doc.createElement('span');
            textelement[style].position='absolute';
            textelement[style].left='-999em';
            textelement.innerHTML='W';
            html.appendChild(textelement);
            textheight=textelement.offsetHeight;
            setInterval(function(){
                var a,b;
                // Trigger text resize event
                if(textheight!=(b=textelement.offsetHeight)){
                    a=listeners.length;
                    while(a){
                        listeners[--a]();
                    }
                }
                textheight=b;
            },250);
        }
        listeners.push(spec);
        return;
    }
    // Compute em unit
    a=doc.createElement('div');
    a[style].width='1em';
    html.appendChild(a);
    var unit=a.offsetWidth;
    unit=unit?unit:16; // because IE6/7 returns a zero offsetWidth
    html.removeChild(a);
    // Tranlate provided px-based width
    if(typeof spec=='number'){
        return spec/unit;
    }
    else{
        // Viewport width
        a=html.offsetWidth;
        // Window width
        if(!(b=win.innerWidth)){
            b=html.clientWidth;
        }
        // Guess the correct "window" width
        a=(b-a)*100/b<5?b:a;
        return spec?a/unit:a;
    }
};