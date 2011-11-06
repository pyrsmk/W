W 0.1.0
=======

W is a minimal library to get the relative width of the window. It's really useful for developing responsive designs because we need to know the size of the current media device, or the relative zoom size, for loading specific stylesheets and javascript code.

Note that this library is designed to be as small as possible to get the script fast loaded on mobiles.

Quickly:

    // Get the current relative width
    W();
    // Get the current relative width in ems
    W(true);
    // Get the provided width in ems
    W(768);

And a concrete example:

    if(W(true)>=W(1440)){
        // some actions for wide screens or shrinked width
    }

