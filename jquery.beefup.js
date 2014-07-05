/*
 * BeefUp v1.0 - A jQuery Accordion Plugin
 * Copyright 2014 Sascha Künstler http://www.schaschaweb.de/
 */

;(function($) {
	'use strict';

    // BeefUp object
    $.beefup = {};

    // Default settings
	$.beefup.defaults = {
        trigger			: '.beefup-head',       // String: Name of the trigger element
        content			: '.beefup-body',       // String: Name of the collapsible content
        openClass		: 'open',				// String: Name of the class which shows if a accordion is triggered or not
        openSingle		: false,				// Boolean: Open just one accordion at once
        animation		: 'slide',				// String: Set animation type, "slide" or "fade"
        showSpeed		: 200,					// Integer: Set the speed of the show animation
        hideSpeed		: 200,					// Integer: Set the speed of the hide animation
        scroll			: false,				// Boolean: Scroll to accordion
        scrollSpeed     : 400,					// Integer: Set the speed of the scroll feature
        scrollOffset	: 0,					// Integer: Additional offset to accordion position
        onInit			: function(){},			// Callback: Fires after the accordion s initially setup
        onOpen			: function(){},			// Callback: Fires after accordion opens content
        onClose			: function(){}			// Callback: Fires after accordion close content
    };

	$.fn.beefup = function(options) {
		// Private variables
		var $obj = this,
            vars = $.extend({}, $.beefup.defaults, options);

		// Public methods
        this.open = function ($this) {
			var $content = $this.find(vars.content + ':first'),
                open = function () {
                    $this.addClass(vars.openClass);
                    $(this).css('overflow', '');
                    if (vars.onOpen) vars.onOpen($this);
                };
			if (vars.animation === 'slide') $content.slideDown(vars.showSpeed, open);
			else $content.fadeIn(vars.showSpeed, open);
			return $obj;
		};
		this.close = function ($this) {
            var $content = $this.find(vars.content + ':first'),
                close = function () {
                    $this.removeClass(vars.openClass);
                    $(this).css('overflow', '');
                    if (vars.onClose) vars.onClose($this);
                };
			if (vars.animation === 'slide') $content.slideUp(vars.hideSpeed, close);
			else $content.fadeOut(vars.hideSpeed, close);
			return $obj;
		};
		this.scroll = function($this) {
			$('html, body').animate({scrollTop: $this.offset().top + vars.scrollOffset}, vars.scrollSpeed);
			return $obj;
		};

		return this.each(function () {
			var $this = $(this);

			if ($this.data('beefup')) return;
			$this.data('beefup', vars);

			$this.not('.' + vars.openClass).find(vars.content + ':first').hide();
            if (vars.onInit) vars.onInit($this);

			$this.on('click', vars.trigger + ':first', function(e) {
				e.preventDefault();
				if (vars.openSingle) $obj.close($obj.not($this));
				if (!$this.hasClass(vars.openClass)) {
					$obj.open($this);
					if (vars.scroll) $obj.scroll($this);
				} else {
					$obj.close($this);
				}
			});
		});

    };
})(jQuery);