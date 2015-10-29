QUnit.test('Events', function(assert) {
	var done = assert.async();
	assert.expect(2);
	alert("Please trigger responsive events (resize window, zoom-in, zoom-out, text resize");
	var first,
		second;
	W.addListener(function() {
		if(!first) {
			first = true;
			assert.ok(true, 'Event catched by first listener');
		}
	});
	W.addListener(function() {
		if(!second) {
			second = true;
			assert.ok(true, 'Event catched by second listener');
			done();
		}
		alert("16px = " + W.px2em(16) + "em");
	});
});

QUnit.test('Chain listeners', function(assert) {
	assert.expect(1);
	assert.ok(typeof W.addListener(function(){}) == 'function', 'A function is returned as well');
});

QUnit.test('Viewport', function(assert) {
	assert.expect(3);
	alert("This test will automatically pass. Please verify that the following RELATIVE resolution is valid : "+W.getViewportWidth() + "x" + W.getViewportHeight());
	assert.ok(true, 'Get viewport resolution (relative)');
	alert("This test will automatically pass. Please verify that the following ABSOLUTE resolution is valid : " + W.getViewportWidth(true) + "x" + W.getViewportHeight(true));
	assert.ok(true, 'Get viewport resolution (absolute)');
	alert("This test will automatically pass. Please verify that the following orientation is valid : " + W.getOrientation());
	assert.ok(true, 'Verify orientation');
});

QUnit.start();