/*
 * BeefUp v1.0.1 - A jQuery Accordion Plugin
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
        animation		: 'slide',				// String: Set animation type to "slide" or "fade"
        openSpeed		: 200,					// Integer: Set the speed of the open animation
        closeSpeed		: 200,					// Integer: Set the speed of the close animation
        scroll			: false,				// Boolean: Scroll to accordion
        scrollSpeed     : 400,					// Integer: Set the speed of the scroll feature
        scrollOffset	: 0,					// Integer: Additional offset to accordion position
        openSingle		: false,				// Boolean: Open just one accordion at once
        selfClose       : false,                // Boolean: Close on click outside
        hash            : true,                 // Boolean: Open accordion with id on hash change
        onInit			: function(){},			// Callback: Fires after the accordions initially setup
        onOpen			: function(){},			// Callback: Fires after accordion opens content
        onClose			: function(){}			// Callback: Fires after accordion close content
    };

	$.fn.beefup = function(options) {
		// Private variables
		var $obj = this,
            vars = $.extend({}, $.beefup.defaults, options);

		// Public methods
        this.open = function ($el) {
            var $this = ($el && $el.length) ? $el : $obj,
                $content = $this.find(vars.content + ':first'),
                open = function () {
                    $this.addClass(vars.openClass);
                    $(this).css('overflow', '');
                    if (vars.onOpen) vars.onOpen($this);
                };
			if (vars.animation === 'slide') $content.slideDown(vars.openSpeed, open);
			else $content.fadeIn(vars.openSpeed, open);
			return $obj;
		};
		this.close = function ($el) {
            var $this  = ($el && $el.length) ? $el : $obj,
                $content = $this.find(vars.content + ':first'),
                close = function () {
                    $this.removeClass(vars.openClass);
                    $(this).css('overflow', '');
                    if (vars.onClose) vars.onClose($this);
                };
			if (vars.animation === 'slide') $content.slideUp(vars.closeSpeed, close);
			else $content.fadeOut(vars.closeSpeed, close);
			return $obj;
		};
		this.scroll = function ($this) {
			$('html, body').animate({scrollTop: $this.offset().top + vars.scrollOffset}, vars.scrollSpeed);
			return $obj;
		},
        this.click = function ($this) {
            if (vars.openSingle) $obj.close($obj.not($this));
            if (!$this.hasClass(vars.openClass)) {
                $obj.open($this);
                if (vars.scroll) $obj.scroll($this);
            } else {
                $obj.close($this);
            }
            return $obj;
        };
        
		return this.each(function () {
			var $this = $(this);
            
			if ($this.data('beefup')) return;
			$this.data('beefup', vars);

            // Init
			$this.not('.' + vars.openClass).find(vars.content + ':first').hide();
            if (vars.onInit) vars.onInit($this);

            // Click event
			$this.on('click', vars.trigger + ':first', function(e) {
				e.preventDefault();
                $obj.click($this);
			});

            // Hash
            if (vars.hash && $this.attr('id')) {
				if ($this.is(window.location.hash)) $obj.open($this);
				$(window).bind('hashchange', function () {
					if ($this.is(window.location.hash)) $obj.open($this);
				});
			}

            // Self close
            if (vars.selfClose) {
                $(document).on('click', function (e) {
                    if ($(e.target).closest($obj).length === 0) {
                        $obj.close($this.filter(vars.openClass));
                    }
                });
            }
		});
    };
})(jQuery);