/*
    IE<=8 must be tested against zoom/text-size
*/

domReady(function(){

    log('Please note that these tests won\'t verify correct implementation on mobiles');

    sink('W',function(test,ok,before,after){
        
        test('Events',2,function(){
            log('You\'ll must call events tests three times in order to catch window resize, zoom and text resize event');
            var a,b;
            W(function(){
                if(!a){
                    ok(true,'Event catched by first listener');
                }
                a=true;
            });
            W(function(){
                if(!b){
                    ok(true,'Event catched by second listener');
                }
                b=true;
            });
        });
        
        test('Specific width',1,function(){
            ok(W(1024)==64,'Format px width in ems [not optimized to pass with text size changing]');
        });
        
        test('Window width',2,function(){
            var width=document.documentElement.clientWidth;
            ok(W()==W(),'Get current window width in pxs');
            ok(W(true)==W(W()),'Get current window width in ems');
        });

    });

    start();

});