/*!
 * BeefUp v1.1.6 - A jQuery Accordion Plugin
 * Copyright 2016 Sascha Künstler http://www.schaschaweb.de/
 */

(function($) {
    'use strict';

    // BeefUp object
    var beefup = {};

    // Defaults
    beefup.defaults = {
        trigger: '.beefup__head',       // String: Name of the trigger element
        content: '.beefup__body',       // String: Name of the collapsible content
        openClass: 'is-open',           // String: Name of the class which shows if a accordion is triggered or not
        animation: 'slide',             // String: Set animation type to "slide", "fade" or leave empty ""
        openSpeed: 200,                 // Integer: Set the speed of the open animation
        closeSpeed: 200,                // Integer: Set the speed of the close animation
        scroll: false,                  // Boolean: Scroll to accordion
        scrollSpeed: 400,               // Integer: Set the speed of the scroll feature
        scrollOffset: 0,                // Integer: Additional offset to accordion position
        openSingle: false,              // Boolean: Open just one accordion at once
        stayOpen: null,                 // Mixed: Leave one item open, accepts null, integer or string
        selfClose: false,               // Boolean: Close on click outside
        selfBlock: false,               // Boolean: Block close event on click
        hash: true,                     // Boolean: Open accordion with id on hash change
        breakpoints: null,              // Mixed: Null or array of objects
        onInit: function() {},          // Callback: Fires after the accordions initially setup
        onOpen: function() {},          // Callback: Fires after accordion opens content
        onClose: function() {},         // Callback: Fires after accordion close content
        onScroll: function() {}         // Callback: Fires after scroll animation
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
                $el = $obj.filter(value);
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
                var $this = $(this),
                    vars = beefup.methods.getVars($this),
                    $content = $this.find(vars.content + ':first'),
                    animation = (vars.animation === 'slide') ? 'slideDown' :
                        (vars.animation === 'fade') ? 'fadeIn' : 'show';

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
                var $this = $(this),
                    vars = beefup.methods.getVars($this),
                    $content = $this.find(vars.content + ':first'),
                    animation = (vars.animation === 'slide') ? 'slideUp' :
                        (vars.animation === 'fade') ? 'fadeOut' : 'hide';

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

            if (vars.openSingle) {
                if (vars.stayOpen !== null) {
                    $obj.close($obj.not($el).not(beefup.methods.getStayOpen($obj, vars.stayOpen)));
                } else {
                    $obj.close($obj.not($el));
                }
            }

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
            var $el = $(el),
                vars = $.extend({}, beefup.defaults, options, $el.data('beefup-options'));

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
