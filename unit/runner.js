domReady(function(){

    log('Please not that these tests won\'t verify correct implementation on mobiles');

    sink('W',function(test,ok,before,after){
        
        test(null,2,function(){
            var width=typeof innerWidth=='number'?innerWidth:document.documentElement.clientWidth;
            ok(W()==width,'Get current window width');
            ok(W(true)==W(width),'Get current window width in ems and verify it with a translated width');
        });

    });

    start();

});
