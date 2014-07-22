domready(function(){

	asyncTest('Events',function(){
		expect(2);
		alert("Please trigger responsive events (resize window, zoom-in, zoom-out, text resize");
		var first,
			second;
		W.addListener(function(){
			if(!first){
				first=true;
				ok(true,'Event catched by first listener');
			}
		});
		W.addListener(function(){
			if(!second){
				second=true;
				ok(true,'Event catched by second listener');
				start();
			}
		});
	});

	test('Convert pixels to ems',function(){
		expect(1);
		ok(W.px2em(1024)==64,'Format px width in ems [not optimized to pass with text size changing]');
	});

	test('Viewport width',function(){
		expect(1);
		alert("This test will automatically pass. Please verify yourself that the following viewport width is valid : "+W.getViewportWidth());
		ok(true,'Get current window width in ems');
	});

	test('Viewport height',function(){
		expect(1);
		alert("This test will automatically pass. Please verify yourself that the following viewport height is valid : "+W.getViewportHeight());
		ok(true,'Get current window width in ems');
	});

	test('Chain listeners',function(){
		expect(1);
		ok(typeof W.addListener(function(){})=='function','A function is returned as well');
	});

});
