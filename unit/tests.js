domReady(function(){

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

        test('Window width',1,function(){
            alert("Is it the good width? : "+W());
            ok(W(true)==W(W()),'Get current window width in ems');
        });

    });

    start();

});
