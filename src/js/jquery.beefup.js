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
        stayOpen: null,

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

        /**
         * Extend options
         *
         * @param {jQuery} $el
         */
        getVars: function($el) {
            return $.extend({}, $el.data('beefup'), $el.data('beefup-options'));
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
        }
    };

    $.fn.beefup = function(options) {
        var $obj = this;

        /**
         * Open
         *
         * @param {jQuery} $el
         * @param {function} [callback]
         * @returns {jQuery}
         */
        this.open = function($el, callback) {
            if (!$el || !$el.length) {
                $el = $obj;
            }

            $el.each(function() {
                var $this = $(this),
                    vars = beefup.methods.getVars($this),
                    $content = $this.find(vars.content + ':first'),
                    animation = (vars.animation === 'slide') ? 'slideDown' :
                        (vars.animation === 'fade') ? 'fadeIn' : 'show';

                // Animation
                beefup.methods.animation(animation, $content, vars.openSpeed, function() {
                    $this.addClass(vars.openClass);
                    $content.css('overflow', '');

                    // Optional callbacks
                    if (callback) {
                        callback();
                    }
                    if (vars.onOpen) {
                        vars.onOpen($this);
                    }
                });
            });

            return $obj;
        };

        /**
         * Close
         *
         * @param {jQuery} $el
         * @param {function} [callback]
         * @returns {jQuery}
         */
        this.close = function($el, callback) {
            if (!$el || !$el.length) {
                $el = $obj;
            }

            $el.each(function() {
                var $this = $(this),
                    vars = beefup.methods.getVars($this),
                    $content = $this.find(vars.content + ':first'),
                    animation = (vars.animation === 'slide') ? 'slideUp' :
                        (vars.animation === 'fade') ? 'fadeOut' : 'hide';

                // Animation
                beefup.methods.animation(animation, $content, vars.closeSpeed, function() {
                    $this.removeClass(vars.openClass);
                    $content.css('overflow', '');

                    // Optional callbacks
                    if (callback) {
                        callback();
                    }
                    if (vars.onClose) {
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
                $obj.close((vars.stayOpen) ? $obj.not($el).not($obj.eq(vars.stayOpen)) : $obj.not($el));
            }

            if (!$el.hasClass(vars.openClass)) {
                $obj.open($el, function() {
                    if (vars.scroll) {
                        $obj.scroll($el);
                    }
                });
            } else {
                $obj.close($el);
            }

            return $obj;
        };

        return this.each(function(index) {
            var $el = $(this),
                vars = $.extend({}, beefup.defaults, options, $el.data('beefup-options')),
                hashChange;

            if ($el.data('beefup')) {
                return;
            }
            $el.data('beefup', vars);

            // Init
            if (vars.stayOpen) {
                $el.not('.' + vars.openClass).not($obj.eq(vars.stayOpen)).find(vars.content + ':first').hide();
            } else {
                $el.not('.' + vars.openClass).find(vars.content + ':first').hide();
            }
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
                hashChange = function() {
                    if ($el.is(window.location.hash) && !$el.hasClass(vars.openClass)) {
                        $obj.click($el);
                    }
                };
                hashChange();
                $(window).bind('hashchange', hashChange);
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
