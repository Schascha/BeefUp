/*!
 * BeefUp v1.1.9 - A jQuery Accordion Plugin
 * Copyright 2014 Sascha Künstler http://www.schaschaweb.de/
 */

(function($) {
	'use strict';

	// BeefUp object
	var beefup = {};

	// Defaults
	beefup.defaults = {
		// Boolean: Enable accessibility features
		accessibility: true,

		// String: Selector of the trigger element
		trigger: '.beefup__head',

		// String: Selector of the collapsible content
		content: '.beefup__body',

		// String: Name of the class which shows if a accordion is triggered or not
		openClass: 'is-open',

		// String: Set animation type to "slide", "fade" or leave empty "", default is "slide"
		animation: 'slide',

		// Integer: Set the speed of the open animation
		openSpeed: 200,

		// Integer: Set the speed of the close animation
		closeSpeed: 200,

		// Boolean: Scroll to accordion on open
		scroll: false,

		// Integer: Set the speed of the scroll animation
		scrollSpeed: 400,

		// Integer: Additional offset to accordion position
		scrollOffset: 0,

		// Boolean: Open just one accordion at once
		openSingle: false,

		// Mixed: Leave items open, accepts null, integer (index) or string (selector, 'first' or 'last')
		stayOpen: null,

		// Boolean: Block close event on click
		selfBlock: false,

		// Boolean: Close accordion on click outside
		selfClose: false,

		// Boolean: Open accordion with id on hash change
		hash: true,

		// Array: Array of objects, default is null
		breakpoints: null,

		// Callback: Fires after the accordions initially setup
		onInit: null,

		// Callback: Fires after accordion opens content
		onOpen: null,

		// Callback: Fires after accordion close content
		onClose: null,

		// Callback: Fires after scroll animation
		onScroll: null
	};

	// Private methods
	beefup.methods = {

		/**
		 * Extend options
		 *
		 * @param {jQuery} $el
		 */
		_getVars: function($el) {
			var vars = $.extend(true, {}, $el.data('beefup'), $el.data('beefup-options'));

			return (vars.breakpoints) ? beefup.methods._getResponsiveVars(vars) : vars;
		},

		/**
		 * Overwrite options depending on breakpoints
		 *
		 * @param {object} vars
		 * @returns {*}
		 */
		_getResponsiveVars: function(vars) {
			var windowWidth = window.innerWidth || $(window).width();

			// Sort
			vars.breakpoints.sort(function(a, b) {
				return ((a.breakpoint < b.breakpoint) ? -1 : ((a.breakpoint > b.breakpoint) ? 1 : 0));
			});

			$.each(vars.breakpoints, function(index, value) {
				if (windowWidth > value.breakpoint) {
					vars = $.extend({}, vars, value.settings);
				}
			});

			return vars;
		},

		/**
		 * Animation types
		 *
		 * @param {string} type
		 * @param {jQuery} $el
		 * @param {number} speed
		 * @param {function} callback
		 */
		_animation: function(type, $el, speed, callback) {
			switch (type) {
				case 'slideDown':
					$el.slideDown(speed, callback);
					break;
				case 'slideUp':
					$el.slideUp(speed, callback);
					break;
				case 'fadeIn':
					$el.fadeIn(speed, callback);
					break;
				case 'fadeOut':
					$el.fadeOut(speed, callback);
					break;
				case 'show':
					$el.show(speed, callback);
					break;
				case 'hide':
					$el.hide(speed, callback);
					break;
			}
		},

		/**
		 * Close helper
		 *
		 * @param  {jQuery} $el
		 * @param  {object} vars
		 * @return {undefined}
		 */
		_close: function($el, vars) {
			var $content = $el.find(vars.content + ':first');

			$el.removeClass(vars.openClass);
			$content.css('overflow', '');

			if (vars.accessibility) {
				$content.attr('hidden', true);
			}
		},

		/**
		 * open helper
		 *
		 * @param  {jQuery} $el
		 * @param  {object} vars
		 * @return {undefined}
		 */
		_open: function($el, vars) {
			var $content = $el.find(vars.content + ':first');

			$el.addClass(vars.openClass);
			$content.css('overflow', 'hidden');

			if (vars.accessibility) {
				$content.attr('hidden', false);
			}
		},

		/**
		 * Get stayOpen element
		 *
		 * @param {jQuery} $obj
		 * @param {number|string} value
		 * @returns {*}
		 */
		_getStayOpen: function($obj, value) {
			var $el;

			if (typeof value === 'number') {
				$el = $obj.eq(value);
			} else if (typeof value === 'string') {
				switch(value) {
					case 'first':
						$el = $obj.first();
						break;
					case 'last':
						$el = $obj.last();
						break;
					default:
						$el = $obj.filter(value);
				}
			}

			return $el;
		},

		/**
		 * Open just one accordion at once
		 *
		 * @param  {jQuery} $obj
		 * @param  {jQuery} $el
		 * @param  {object} vars
		 * @return {undefined}
		 */
		_openSingle: function($obj, $el, vars) {
			if (!vars.openSingle) {
				return;
			}

			var $close = $obj.not($el);

			if (vars.stayOpen !== null) {
				$close = $close.not(beefup.methods._getStayOpen($obj, vars.stayOpen));
			}

			$obj.close($close.filter(function() {
				return !$(this).find($el).length;
			}));
		},

		/**
		 * Add self close event
		 *
		 * @param {jQuery} $obj
		 * @param {object} vars
		 */
		_addSelfCloseEvent: function($obj, vars) {
			if (!vars.selfClose) {
				return;
			}

			$(document).on('click', function(e) {
				if ($(e.target).closest($obj).length) {
					return;
				}

				// Find open items
				var $el = $obj.filter('.' + vars.openClass);

				// Exclude stayOpen item
				if (vars.stayOpen !== null) {
					$el = $el.not(beefup.methods._getStayOpen($obj, vars.stayOpen));
				}

				// Close remaining items
				if ($el.length) {
					$obj.close($el);
				}
			});
		},

		/**
		 * Add hash change event
		 *
		 * @param {jQuery} $obj
		 * @param {object} vars
		 */
		_addHashchangeEvent: function($obj, vars) {
			if (!vars.hash) {
				return;
			}

			var hashChange = function() {
				var $el = $obj.filter(window.location.hash);

				if ($el.length && !$el.hasClass(vars.openClass)) {
					$obj.click($el);
				}
			};

			hashChange();
			$(window).on('hashchange', hashChange);
		}
	};

	$.fn.beefup = function(options) {
		var $obj = this;

		/**
		 * Open
		 *
		 * @param {jQuery} [$el]
		 * @param {function} [callback]
		 * @returns {jQuery}
		 */
		this.open = function($el, callback) {
			if (!$el || !$el.length) {
				$el = $obj;
			}

			$el.each(function() {
				var
					$this = $(this),
					vars = beefup.methods._getVars($this),
					$content = $this.find(vars.content + ':first'),
					animation = (vars.animation === 'slide') ? 'slideDown' :
						(vars.animation === 'fade') ? 'fadeIn' : 'show'
				;

				// Open single
				beefup.methods._openSingle($obj, $el, vars);

				// Animation
				beefup.methods._animation(animation, $content, vars.openSpeed, function() {
					beefup.methods._open($this, vars);

					// Scroll
					if (vars.scroll) {
						$obj.scroll($el);
					}

					// Callbacks
					if (callback && typeof callback === 'function') {
						callback();
					}

					if (vars.onOpen && typeof vars.onOpen === 'function') {
						vars.onOpen($this);
					}
				});
			});

			return $obj;
		};

		/**
		 * Close
		 *
		 * @param {jQuery} [$el]
		 * @param {function} [callback]
		 * @returns {jQuery}
		 */
		this.close = function($el, callback) {
			if (!$el || !$el.length) {
				$el = $obj;
			}

			$el.each(function() {
				var
					$this = $(this),
					vars = beefup.methods._getVars($this),
					$content = $this.find(vars.content + ':first'),
					animation = (vars.animation === 'slide') ? 'slideUp' :
						(vars.animation === 'fade') ? 'fadeOut' : 'hide'
				;

				// Animation
				beefup.methods._animation(animation, $content, vars.closeSpeed, function() {
					beefup.methods._close($this, vars);

					// Callbacks
					if (callback && typeof callback === 'function') {
						callback();
					}

					if (vars.onClose && typeof vars.onClose === 'function') {
						vars.onClose($this);
					}
				});
			});

			return $obj;
		};

		/**
		 * Scroll
		 *
		 * @param {jQuery} $el
		 * @returns {jQuery}
		 */
		this.scroll = function($el) {
			var vars = beefup.methods._getVars($el);

			$('html, body').animate(
				{scrollTop: $el.offset().top + vars.scrollOffset},
				vars.scrollSpeed
			).promise().done(function() {
				if (vars.onScroll && typeof vars.onScroll === 'function') {
					vars.onScroll($el);
				}
			});

			return $obj;
		};

		/**
		 * Click
		 *
		 * @param {jQuery} $el
		 * @returns {jQuery}
		 */
		this.click = function($el) {
			var vars = beefup.methods._getVars($el);

			if (!$el.hasClass(vars.openClass)) {
				$obj.open($el);
			} else {
				if (!vars.selfBlock) {
					$obj.close($el);
				}
			}

			return $obj;
		};

		return this.each(function(index, el) {
			var
				$el = $(el),
				vars = $.extend({}, beefup.defaults, options, $el.data('beefup-options'))
			;

			if ($el.data('beefup')) {
				return;
			}

			$el.data('beefup', vars);

			// Breakpoints
			if (vars.breakpoints) {
				vars = beefup.methods._getResponsiveVars(vars);
			}

			// Open stayOpen item
			if (vars.stayOpen !== null && $el.is(beefup.methods._getStayOpen($obj, vars.stayOpen))) {
				beefup.methods._open($el, vars);
			}

			// Close inactive items
			beefup.methods._close($el.not('.' + vars.openClass), vars);

			// Callback
			if (vars.onInit && typeof vars.onInit === 'function') {
				vars.onInit($el);
			}

			// Click event
			$el.on('click', vars.trigger + ':first', function(e) {
				e.preventDefault();
				$obj.click($el);
			});

			// Trigger only once
			if (index === 0) {
				beefup.methods._addHashchangeEvent($obj, vars);
				beefup.methods._addSelfCloseEvent($obj, vars);
			}
		});
	};

})(jQuery);
