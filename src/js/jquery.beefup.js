/*!
 * BeefUp v1.1.8 - A jQuery Accordion Plugin
 * Copyright 2014 Sascha Künstler http://www.schaschaweb.de/
 */

(function($) {
	'use strict';

	// BeefUp object
	var beefup = {};

	// Defaults
	beefup.defaults = {
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
		getVars: function($el) {
			var vars = $.extend(true, {}, $el.data('beefup'), $el.data('beefup-options'));

			if (vars.breakpoints) {
				vars = beefup.methods.getResponsiveVars(vars);
			}

			return vars;
		},

		/**
		 * Overwrite options depending on breakpoints
		 *
		 * @param {object} vars
		 * @returns {*}
		 */
		getResponsiveVars: function(vars) {
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
		animation: function(type, $el, speed, callback) {
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
		 * Get stayOpen element
		 *
		 * @param {jQuery} $obj
		 * @param {number|string} value
		 * @returns {*}
		 */
		getStayOpen: function($obj, value) {
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
		 * Add self close event
		 *
		 * @param {jQuery} $obj
		 * @param {object} vars
		 */
		selfClose: function($obj, vars) {
			$(document).on('click', function(e) {
				var $el;

				if (!$(e.target).closest($obj).length) {

					// Find open items
					$el = $obj.filter('.' + vars.openClass);

					// Exclude stayOpen item
					if (vars.stayOpen !== null) {
						$el = $el.not(beefup.methods.getStayOpen($obj, vars.stayOpen));
					}

					// Close remaining items
					if ($el.length) {
						$obj.close($el);
					}
				}
			});
		},

		/**
		 * Add hash change event
		 *
		 * @param {jQuery} $obj
		 * @param {object} vars
		 */
		hash: function($obj, vars) {
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
					vars = beefup.methods.getVars($this),
					$content = $this.find(vars.content + ':first'),
					$close = $obj.not($el),
					animation = (vars.animation === 'slide') ? 'slideDown' :
						(vars.animation === 'fade') ? 'fadeIn' : 'show'
				;

				// Open single
				if (vars.openSingle) {
					if (vars.stayOpen !== null) {
						$close = $close.not(beefup.methods.getStayOpen($obj, vars.stayOpen));
					}

					$obj.close($close.filter(function() {
						return !$(this).find($el).length;
					}));
				}

				// Animation
				beefup.methods.animation(animation, $content, vars.openSpeed, function() {
					$this.addClass(vars.openClass);
					$content.css('overflow', '');

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
					vars = beefup.methods.getVars($this),
					$content = $this.find(vars.content + ':first'),
					animation = (vars.animation === 'slide') ? 'slideUp' :
						(vars.animation === 'fade') ? 'fadeOut' : 'hide'
				;

				// Animation
				beefup.methods.animation(animation, $content, vars.closeSpeed, function() {
					$this.removeClass(vars.openClass);
					$content.css('overflow', '');

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
			var vars = beefup.methods.getVars($el);

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
			var vars = beefup.methods.getVars($el);

			if (!$el.hasClass(vars.openClass)) {
				$obj.open($el, function() {
					if (vars.scroll) {
						$obj.scroll($el);
					}
				});
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

			if (vars.breakpoints) {
				vars = beefup.methods.getResponsiveVars(vars);
			}

			if (vars.stayOpen !== null && $el.is(beefup.methods.getStayOpen($obj, vars.stayOpen))) {
				$el.addClass(vars.openClass);
			}

			$el.not('.' + vars.openClass).find(vars.content + ':first').hide();

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

				// Hash
				if (vars.hash) {
					beefup.methods.hash($obj, vars);
				}

				// Self close
				if (vars.selfClose) {
					beefup.methods.selfClose($obj, vars);
				}
			}
		});
	};

})(jQuery);
