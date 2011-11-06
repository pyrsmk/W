/*
    W, one width to rule them all

    Version     : 0.1.0
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/W
    License     : MIT
    
    Some reading
    
        http://www.quirksmode.org/mobile/viewports.html
        http://www.quirksmode.org/mobile/tableViewport.html
*/

(function(name,def){
    if(typeof module!='undefined'){
        module.exports=def;
    }
    else{
        this[name]=def;
    }
}('W',function(){
    
    /*
        Get viewport width
        
        Parameters
            boolean ems: true to retrieve em-based width
        
        Return
            integer
    */
    return function(ems){
        /*
            en tant que développeur web, il est important d'avoir la taille relative de la fenêtre du navigateur et pas du viewport car les scrollbars pour les navigateurs de bureau changent légèrement cette largeur et ceci est moins intuitif pour la prise en charge et l'adaptation d'un design; néanmoins, sur les mobiles c'est la taille du viewport qui va primer car la récupération de la taille de la fenetre n'est pas aisée (surtout avec Opera Mobile qui donne la taille de l'écran non relative)
        */
        // à inclure dans molt?
        // Guess window width
        var viewport_width=document.documentElement.offsetWidth,
            window_width=(typeof window.innerWidth)=='number'?window.innerWidth:document.documentElement.clientWidth,
            width=(window_width-viewport_width)*100/window_width<5?window_width:viewport_width;
        // Translate it in ems
        if(ems){
            var element=document.createElement('div'),
                html=document.documentElement;
            element.style.width='10em';
            html.appendChild(element);
            width/=element.offsetWidth/10;
            html.removeChild(element);
        }
        return width;
    };
    
}()));