var $ = require('jquery');
global.$ = global.jQuery = $;
require('./jquery.beefup');


function __fixture() {
	return '<article class="beefup"><h3 class="beefup__head"></h3><div class="beefup__body"></div></article>';
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
			openClass: 'is-open',
			openSpeed: 0,
			closeSpeed: 0,
			scrollSpeed: 0
		};
	});

	afterEach(function() {
		document.body.innerHTML = '';
	});

	it('should be chainable', function() {
		expect($el.beefup().addClass('test')).toBeTruthy();
		expect($el.hasClass('test')).toBeTruthy();
	});

	it('should initialize', function() {
		expect($el.beefup().data('beefup')).toBeTruthy();
	});

	it('should have api methods', function() {
		var classname = options.openClass;

		expect($el.beefup(options).open().hasClass(classname)).toBeTruthy();
		expect(!$el.close().hasClass(classname)).toBeTruthy();
		expect($el.click($el).hasClass(classname)).toBeTruthy();
		expect(!$el.click($el).hasClass(classname)).toBeTruthy();
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

		expect($el.hasClass('test-init'));
		expect($el.open($el).hasClass('test-open'));
		expect($el.close($el).hasClass('test-close'));
	});

	it('should use HTML5 data attributes', function() {
		$el.beefup(options).attr('data-beefup-options', '{"openClass": "test"}');

		expect($el.open($el).hasClass('test'));
	});

});
