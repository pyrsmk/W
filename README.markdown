W 0.1.1
=======

W is a must needed tool for responsive design developers. Knowing the current width of the viewport is necessary for us as well as catching window resize, zoom or text resize events. Moreover, we also need to deal with em units most of the time. Then, since browsers and devices could be quite different and there's no easy way to get all of that magic stuff: W is born.

Quickly:

    // Get the viewport width in pxs
    W();
    // Get the viewport width in ems
    W(true);
    // Get the provided width in ems
    W(768);
    // Add a listener to catch window resize, zoom and text resize events
    W(function(){});

And a concrete example:

    if(W(true)>=W(1440)){
        // some actions for wide screens or shrinked contents
    }
    // Catch events to update contents when needed
    W(function(){
        // Refresh stylesheets to force contents adaptation (especially for zooming and text size changing)
        var links=document.getElementsByTagName('link'),
            i=-1,
            element;
        while(element=links[++i]){
            if(element.rel=='stylesheet'){
                element.disabled=true;
                element.disabled=false;
            }
        }
    });

Notes
-----

The current relative width will be the viewport width on mobiles and the window width on desktops. With that way, you'll be able to adapt your design accross window sizes, screen sizes, zoom levels and text sizes.

This library is designed to be as small as possible to get the script fast loaded on mobiles, so there will never be ender integration or something like that.

License
-------

W is licensed under the MIT license.
