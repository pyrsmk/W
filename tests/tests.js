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

	test('Chain listeners',function(){
		expect(1);
		ok(typeof W.addListener(function(){})=='function','A function is returned as well');
	});

	test('Viewport',function(){
		expect(3);
		alert("This test will automatically pass. Please verify that the following RELATIVE resolution is valid : "+W.getViewportWidth()+"x"+W.getViewportHeight());
		ok(true,'Get viewport resolution (relative)');
		alert("This test will automatically pass. Please verify that the following ABSOLUTE resolution is valid : "+W.getViewportWidth(true)+"x"+W.getViewportHeight(true));
		ok(true,'Get viewport resolution (absolute)');
		alert("This test will automatically pass. Please verify that the following orientation is valid : "+W.getOrientation());
		ok(true,'Verify orientation');
	});

});
