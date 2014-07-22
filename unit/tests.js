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
			alert("The new unit is "+W.px2em(16));
		});
	});

	test('Viewport width',function(){
		expect(1);
		alert("This test will automatically pass. Please verify yourself that the following viewport width is valid : "+W.getViewportWidth());
		ok(true,'Get current viewport width');
	});

	test('Viewport height',function(){
		expect(1);
		alert("This test will automatically pass. Please verify yourself that the following viewport height is valid : "+W.getViewportHeight());
		ok(true,'Get current viewport height');
	});

	test('Chain listeners',function(){
		expect(1);
		ok(typeof W.addListener(function(){})=='function','A function is returned as well');
	});

});
