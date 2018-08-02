var $template = $('#template'), html = $template.html();

// Clear
$template.remove();

QUnit.module('BeefUp', {
    beforeEach: function() {
        this.root = $('#qunit-fixture');
        this.root.append(html);
        this.$el = $('.beefup');
        this.options = {
            openClass: 'is-open',
            openSpeed: 0,
            closeSpeed: 0,
            scrollSpeed: 0
        };
    }
});

QUnit.test('chainable', function(assert) {
    assert.ok(this.$el.beefup().addClass('test'), 'can be chained');
    assert.ok(this.$el.hasClass('test'), 'class was added correctly from chaining');
});

QUnit.test('initialize', function(assert) {
    assert.ok(this.$el.beefup().data('beefup'), 'is initialized');
});

QUnit.test('api methods', function(assert) {
    this.$el.beefup(this.options);
    assert.ok(this.$el.open().hasClass(this.options.openClass), 'element is open');
    assert.ok(!this.$el.close().hasClass(this.options.openClass), 'element is closed');
    assert.ok(this.$el.click(this.$el).hasClass(this.options.openClass), 'click will open element');
    assert.ok(!this.$el.click(this.$el).hasClass(this.options.openClass), 'click will close element');
});

QUnit.test('callbacks', function(assert) {
    var i = 0;

    this.$el.beefup($.extend({}, this.options, {
        onInit: function($el) {
            $el.addClass('test-' + ++i);
        },
        onOpen: function($el) {
            $el.addClass('test-' + ++i);
        },
        onClose: function($el) {
            $el.addClass('test-' + ++i);
        }
    }));

    assert.ok(this.$el.hasClass('test-1'), 'element is initialized');
    assert.ok(this.$el.open(this.$el).hasClass('test-2'), 'element is open');
    assert.ok(this.$el.close(this.$el).hasClass('test-3'), 'element is closed');
});

QUnit.test('HTML5 data attributes', function(assert) {
    this.$el.beefup(this.options).attr('data-beefup-options', '{"openClass": "test"}');
    assert.ok(this.$el.open(this.$el).hasClass('test'), 'change open class');
});
