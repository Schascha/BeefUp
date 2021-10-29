var $ = require('jquery');
global.$ = global.jQuery = $;
require('./jquery.beefup');


function __fixture(trigger) {
	return '<article class="beefup">' +
		'<' + (trigger || 'h3') + ' class="beefup__head">Trigger</' + (trigger || 'h3') + '>' +
		'<div class="beefup__body">Content</div>' +
		'</article>';
}


describe('BeefUp', function() {
	var
		$el,
		options
	;

	beforeEach(function() {
		document.body.innerHTML = __fixture();
		$el = $('.beefup');
		options = {
			accessibility: false,
			trigger: '.beefup__head',
			openClass: 'is-open',
			openSpeed: 0,
			closeSpeed: 0,
			scrollSpeed: 0
		};
	});

	afterEach(function() {
		document.body.innerHTML = '';
		$el = null;
		options = null;
		window.location.hash = '';
	});

	it('should be chainable', function() {
		expect($el.beefup().addClass('test')).toBeTruthy();
		expect($el.hasClass('test')).toBeTruthy();
	});

	it('should initialize', function() {
		$el.beefup();
		expect($el.data('beefup')).toBeTruthy();
		expect($el.beefup().data('beefup')).toBeTruthy();
	});

	it('should have click events', function() {
		$el.beefup($.extend({}, options, {
			selfClose: true
		}));

		$el.find(options.trigger + ':first').trigger('click');
		expect($el.hasClass(options.openClass)).toBeTruthy();

		$(document).trigger('click');
		expect($el.hasClass(options.openClass)).toBeFalsy();
	});

	it('should open only once', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			openSingle: true
		}));

		expect($el.length).toBe(2);
		$el.first().find(options.trigger + ':first').trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeTruthy();

		$el.last().find(options.trigger + ':first').trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeFalsy();
		expect($el.last().hasClass(options.openClass)).toBeTruthy();
	});

	it('should stay open first item', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			openSingle: true,
			stayOpen: 'first',
			selfClose: true
		}));

		expect($el.length).toBe(2);
		expect($el.first().hasClass(options.openClass)).toBeTruthy();

		$el.last().find(options.trigger + ':first').trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeTruthy();

		$(document).trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeTruthy();
	});

	it('should stay open last item', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			stayOpen: 'last'
		}));

		$el.first().find(options.trigger + ':first').trigger('click');
		expect($el.last().hasClass(options.openClass)).toBeTruthy();
	});

	it('should stay open by index', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			stayOpen: 0
		}));

		$el.last().find(options.trigger + ':first').trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeTruthy();
	});

	it('should stay open by selector', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			stayOpen: ':first'
		}));

		$el.last().find(options.trigger + ':first').trigger('click');
		expect($el.first().hasClass(options.openClass)).toBeTruthy();
	});

	it('should have api methods', function() {
		var classname = options.openClass;

		expect($el.beefup(options).open().hasClass(classname)).toBeTruthy();
		expect(!$el.close().hasClass(classname)).toBeTruthy();
		expect($el.click($el).hasClass(classname)).toBeTruthy();
		expect(!$el.click($el).hasClass(classname)).toBeTruthy();
	});

	it('should have fade animation', function() {
		expect($el.beefup($.extend({}, options, {
			animation: 'fade'
		})).open().hasClass(options.openClass)).toBeTruthy();
		expect($el.close().hasClass(options.openClass)).toBeFalsy();
	});

	it('should have empty animation', function() {
		expect($el.beefup($.extend({}, options, {
			animation: ''
		})).open().hasClass(options.openClass)).toBeTruthy();
		expect($el.close().hasClass(options.openClass)).toBeFalsy();
	});

	it('should have callbacks', function() {
		$el.beefup($.extend({}, options, {
			onInit: function($el) {
				$el.addClass('test-init');
			},
			onOpen: function($el) {
				$el.addClass('test-open');
			},
			onClose: function($el) {
				$el.addClass('test-close');
			}
		}));

		expect($el.hasClass('test-init')).toBeTruthy();

		expect($el.open($el, function($el) {
			$el.addClass('test-open-2');
		}).is('.test-open, .test-open-2')).toBeTruthy();

		expect($el.close($el, function($el) {
			$el.addClass('test-close-2');
		}).is('test-close, .test-close-2')).toBeTruthy();
	});

	it('should trigger scroll event', function() {
		expect.assertions(1);
		$el.beefup($.extend({}, options, {
			scroll: true,
			onScroll: function($item) {
				expect($item).toBeTruthy();
			}
		})).open();
	});

	it('should use HTML5 data attributes', function() {
		$el.beefup(options).attr('data-beefup-options', '{"openClass": "test"}');

		expect($el.open($el).hasClass('test'));
	});

	it('should use breakpoints', function() {
		document.body.innerHTML += __fixture();
		$el = $('.beefup').beefup($.extend({}, options, {
			openSingle: false,
			breakpoints: [
				{
					breakpoint: 1024,
					settings: {
						openSingle: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						openSingle: true
					}
				}
			]
		}));

		var width = window.innerWidth;

		// Test if openSingle is enabled on large screens
		window.innerWidth = 768;
		$el.open($el.first());
		$el.open($el.last());
		expect($el.first().hasClass(options.openClass)).toBeFalsy();

		// Test if openSingle is disabled on small screens
		window.innerWidth = 380;
		$el.open($el.first());
		expect($el.last().hasClass(options.openClass)).toBeTruthy();

		window.innerWidth = width;
	});

	it('should initialize accessibility features', function() {
		document.body.innerHTML += __fixture('button');
		$el = $('.beefup').beefup($.extend({}, options, {
			accessibility: true,
			selfBlock: true
		}));

		var $trigger = $el.find(options.trigger + ' > button');

		expect($trigger.length).toBe(1);
		expect($trigger.attr('id')).toBeTruthy();
		expect($trigger.attr('aria-expanded')).toBe('false');

		$trigger.trigger('click');
		expect($trigger.attr('aria-expanded')).toBe('true');
		expect($trigger.attr('aria-disabled')).toBe('true');
	});

	it('should listen on hash change', function() {
		$el = $('.beefup').attr('id', 'beefup').beefup(options);
		window.location.hash = 'beefup';
		$(window).trigger('hashchange');
		expect($el.hasClass(options.openClass)).toBeTruthy();
	});

	it('should not listen on hash change', function() {
		$el = $('.beefup').attr('id', 'beefup').beefup($.extend({}, options, {
			hash: false
		}));

		window.location.hash = 'beefup';
		$(window).trigger('hashchange');
		expect($el.hasClass(options.openClass)).toBeFalsy();
	});

});
