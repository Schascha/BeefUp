/*!
 * BeefUp v1.1.1 - A jQuery Accordion Plugin
 * Copyright 2016 Sascha Künstler http://www.schaschaweb.de/
 */

(function($) {
    'use strict';

    // BeefUp object
    var beefup = {};

    // Defaults
    beefup.defaults = {
        trigger: '.beefup__head',   // String: Name of the trigger element
        content: '.beefup__body',   // String: Name of the collapsible content
        openClass: 'is-open',       // String: Name of the class which shows if a accordion is triggered or not
        animation: 'slide',         // String: Set animation type to "slide", "fade" or leave empty ""
        openSpeed: 200,             // Integer: Set the speed of the open animation
        closeSpeed: 200,			// Integer: Set the speed of the close animation
        scroll: false,				// Boolean: Scroll to accordion
        scrollSpeed: 400,			// Integer: Set the speed of the scroll feature
        scrollOffset: 0,			// Integer: Additional offset to accordion position
        openSingle: false,			// Boolean: Open just one accordion at once
        selfClose: false,           // Boolean: Close on click outside
        hash: true,                 // Boolean: Open accordion with id on hash change

        // Callback: Fires after the accordions initially setup
        onInit: function() {
        },

        // Callback: Fires after accordion opens content
        onOpen: function() {
        },

        // Callback: Fires after accordion close content
        onClose: function() {
        }
    };

    // Private methods
    beefup.methods = {
        getVars: function($el) {
            return $.extend({}, $el.data('beefup'), $el.data('beefup-options'));
        },
        open: function($el) {
            var vars = beefup.methods.getVars($el),
                $content = $el.find(vars.content + ':first'),
                complete = function() {
                    $el.addClass(vars.openClass);
                    $content.css('overflow', '');

                    if (vars.onOpen) {
                        vars.onOpen($el);
                    }
                };

            // Animation
            switch (vars.animation) {
                case 'slide':
                    $content.slideDown(vars.openSpeed, complete);
                    break;
                case 'fade':
                    $content.fadeIn(vars.openSpeed, complete);
                    break;
                default:
                    $content.show(vars.openSpeed, complete);
            }
        },
        close: function($el) {
            var vars = beefup.methods.getVars($el),
                $content = $el.find(vars.content + ':first'),
                complete = function() {
                    $el.removeClass(vars.openClass);
                    $content.css('overflow', '');

                    if (vars.onClose) {
                        vars.onClose($el);
                    }
                };

            // Animation
            switch (vars.animation) {
                case 'slide':
                    $content.slideUp(vars.closeSpeed, complete);
                    break;
                case 'fade':
                    $content.fadeOut(vars.closeSpeed, complete);
                    break;
                default:
                    $content.hide(vars.closeSpeed, complete);
            }
        }
    };

    $.fn.beefup = function(options) {
        var $obj = this;

        /**
         * Open
         *
         * @param {jQuery} $el
         * @returns {jQuery}
         */
        this.open = function($el) {
            if (!$el || !$el.length) {
                $el = $obj;
            }

            $el.each(function() {
                beefup.methods.open($(this));
            });

            return $obj;
        };

        /**
         * Close
         *
         * @param {jQuery} $el
         * @returns {jQuery}
         */
        this.close = function($el) {
            if (!$el || !$el.length) {
                $el = $obj;
            }

            $el.each(function() {
                beefup.methods.close($(this));
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

            $('html, body').animate({scrollTop: $el.offset().top + vars.scrollOffset}, vars.scrollSpeed);

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

            if (vars.openSingle) {
                $obj.close($obj.not($el));
            }

            if (!$el.hasClass(vars.openClass)) {
                $obj.open($el);

                if (vars.scroll) {
                    $obj.scroll($el);
                }
            } else {
                $obj.close($el);
            }

            return $obj;
        };

        return this.each(function() {
            var $el = $(this),
                vars = $.extend({}, beefup.defaults, options, $el.data('beefup-options'));

            if ($el.data('beefup')) {
                return;
            }
            $el.data('beefup', vars);

            // Init
            $el.not('.' + vars.openClass).find(vars.content + ':first').hide();
            if (vars.onInit) {
                vars.onInit($el);
            }

            // Click event
            $el.on('click', vars.trigger + ':first', function(e) {
                e.preventDefault();
                $obj.click($el);
            });

            // Hash
            if (vars.hash && $el.attr('id')) {
                if ($el.is(window.location.hash)) {
                    $obj.open($el);
                }
                $(window).bind('hashchange', function() {
                    if ($el.is(window.location.hash)) {
                        $obj.open($el);
                    }
                });
            }

            // Self close
            if (vars.selfClose) {
                $(document).on('click', function(e) {
                    if (!$(e.target).closest($obj).length) {
                        $obj.close($el.filter(vars.openClass));
                    }
                });
            }
        });
    };

})(jQuery);
